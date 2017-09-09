import { Environment, ValidationDescriptors, ValidationError } from '@validations/core';
import normalize, { ValidationBuilder, validates } from '@validations/dsl';
import { Task } from 'no-show';
import { Dict, dict, entries, unknown } from 'ts-std';
import { validate } from '../validate';
import { Validator, ValueValidator, factoryFor } from './value';

export interface ObjectErrorMessage {
  key: 'object';
  args: null;
}

export class ObjectValidator extends ValueValidator<null, ObjectErrorMessage> {
  validate(v: unknown): Task<ObjectErrorMessage | void> {
    return new Task(async () => {
      // ignore null and undefined, which should be handled by the presence validator
      if (typeof v === 'object' || v === null || v === undefined) return;

      return { key: 'object' as 'object', args: null };
    });
  }
}

export function isObject(): ValidationBuilder {
  return validates(factoryFor(ObjectValidator), null);
}

function mapError({ path, message }: ValidationError, key: string): ValidationError {
  return { path: [key, ...path], message };
}

export class FieldsValidator implements Validator {
  constructor(protected env: Environment, protected descriptors: Dict<ValidationDescriptors>) {}

  run(v: unknown): Task<ValidationError[]> {
    return new Task(async run => {
      if (typeof v !== 'object' || v === null || v === undefined) return [];

      let errors: ValidationError[] = [];

      for (let [key, descriptors] of entries(this.descriptors)) {
        let suberrors = await run(validate(this.env, (v as Dict<unknown>)[key], descriptors!));
        errors.push(...suberrors.map(error => mapError(error, key)));
      }

      return errors;
    });
  }
}

export function objectFields(fields: Dict<ValidationBuilder[] | ValidationBuilder>): ValidationBuilder {
  return validates(factoryFor(FieldsValidator), normalizeFields(fields));
}

function normalizeFields(fields: Dict<ValidationBuilder[] | ValidationBuilder>): Dict<ValidationDescriptors> {
  let out = dict<ValidationDescriptors>();

  for (let [key, value] of entries(fields)) {
    let descriptors = Array.isArray(value) ? normalize(...value) : normalize(value!);

    if (descriptors.length > 0) {
      out[key] = descriptors;
    }
  }

  return out;
}

export function obj(builder: Dict<ValidationBuilder[] | ValidationBuilder>): ValidationBuilder {
  return isObject().and(objectFields(builder));
}
