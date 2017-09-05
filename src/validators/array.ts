import { FieldValidationDescriptors } from '@validations/core';
import normalize, { FieldValidationBuilders, ValidationBuilder, validates } from '@validations/dsl';
import { Task } from 'no-show';
import { unknown } from 'ts-std';
import { validate } from '../validate';
import { NoArgs, ValidationError, Validator } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class ArrayValidator extends SingleFieldValidator<NoArgs> {
  protected normalized: FieldValidationDescriptors;

  validate(value: unknown, error: SingleFieldError): void {
    // ignore null and undefined, which should be handled by the presence validator
    if (Array.isArray(value) || value === null || value === undefined) return;

    error.set('array');
  }
}

export class MembersValidator extends Validator<[FieldValidationDescriptors]> {
  run(): Task<ValidationError[]> {
    let { value, arg: validators, env, field } = this;

    return new Task(async run => {
      if (!Array.isArray(value)) {
        return [];
      }

      let errors: ValidationError[] = [];

      let suberrors = await run(validate(env, value, validators));

      for (let error of suberrors) {
        errors.push({ message: error.message, path: [field, ...error.path] });
      }

      return errors;
    });
  }
}

export function array(dsl: FieldValidationBuilders): ValidationBuilder {
  return validates('array').and(validates('members', normalize(dsl)));
}
