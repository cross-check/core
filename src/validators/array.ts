import { Environment, ValidationDescriptors, ValidationError } from '@validations/core';
import normalize, { ValidationBuilder, validates } from '@validations/dsl';
import { Task } from 'no-show';
import { unknown } from 'ts-std';
import { validate } from '../validate';
import { Validator, ValueValidator, factoryFor } from './value';

export interface ArrayErrorMessage {
  key: 'array';
  args: null;
}

export class ArrayValidator extends ValueValidator<null, ArrayErrorMessage> {
  validate(v: unknown): Task<ArrayErrorMessage | void> {
    return new Task(async () => {
      // ignore null and undefined, which should be handled by the presence validator
      if (Array.isArray(v) || v === null || v === undefined) return;

      return { key: 'array' as 'array', args: null };
    });
  }
}

export function isArray(): ValidationBuilder {
  return validates(factoryFor(ArrayValidator), null);
}

function mapError({ path, message }: ValidationError, index: number): ValidationError {
  return { path: [...path, String(index)], message };
}

export class MembersValidator implements Validator {
  constructor(protected env: Environment, protected descriptors: ValidationDescriptors) {}

  run(v: unknown): Task<ValidationError[]> {
    return new Task(async run => {
      if (!Array.isArray(v)) {
        return [];
      }

      let errors: ValidationError[] = [];

      for (let i = 0; i < v.length; i++) {
        let suberrors = await run(validate(this.env, v[i], this.descriptors));
        errors.push(...suberrors.map(error => mapError(error, i)));
      }

      return errors;
    });
  }
}

export function arrayItems(builder: ValidationBuilder): ValidationBuilder {
  return validates(factoryFor(MembersValidator), normalize(builder));
}

export function array(builder: ValidationBuilder): ValidationBuilder {
  return isArray().and(arrayItems(builder));
}
