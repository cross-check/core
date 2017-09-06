import { FieldValidationDescriptors } from '@validations/core';
import normalize, { FieldValidationBuilders, ValidationBuilder, validates } from '@validations/dsl';
import { Task } from 'no-show';
import { unknown } from 'ts-std';
import { NoArgs, ValidationError, Validator } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class ObjectValidator extends SingleFieldValidator<NoArgs> {
  validate(value: unknown, error: SingleFieldError): void {
    // ignore null and undefined, which should be handled by the presence validator
    if (typeof value === 'object' || value === undefined) return;

    error.set('object');
  }
}

export class FieldsValidator extends Validator<[FieldValidationDescriptors]> {
  run(): Task<ValidationError[]> {
    let { value, field } = this;

    return new Task(async run => {
      let errors: ValidationError[] = [];

      if (typeof value === 'object' && value !== null) {
        let { arg, env } = this;

        for (let key of Object.keys(arg)) {
          let suberrors = await run(validateFlattened(env, value, arg[key]!));

          for (let error of suberrors) {
            errors.push({ message: error.message, path: [field, ...error.path] });
          }
        }
      }

      return errors;
    });
  }
}

export function obj(dsl: FieldValidationBuilders): ValidationBuilder     {
  return validates('object').and(validates('fields', normalize(dsl)));
}

export function length(options: { min: number, max?: number }): ValidationBuilder {
  return obj({
    length: validates('presence').and(validates('numeric')).and(validates('range', options))
  });
}

export function range(options: { min?: number, max?: number }): ValidationBuilder {
  return validates('presence').and(validates('numeric')).and(validates('range', options));
}
