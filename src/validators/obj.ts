import normalizeDSL, { FieldsDSL, ValidationBuilderDSL, ValidationDescriptor, ValidationDescriptors, multi, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';
import { Task } from 'no-show';
import { Opaque } from '../utils';
import { validateFlattened } from '../validate';
import { NoArgs, ValidationError, Validator } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class ObjectValidator extends SingleFieldValidator<NoArgs> {
  protected normalized: ValidationDescriptor[];

  validate(value: Opaque, error: SingleFieldError): void {
    // ignore null and undefined, which should be handled by the presence validator
    if (typeof value === 'object' || value === undefined) return;

    error.set('object');
  }
}

export class FieldsValidator extends Validator<[ValidationDescriptors]> {
  protected normalized: ValidationDescriptors;

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

export function obj(dsl: FieldsDSL): Nested<ValidationBuilderDSL> {
  return multi().add(validates('object')).add(validates('fields', normalizeDSL(dsl)));
}

export function notnull(input: Nested<ValidationBuilderDSL>): Nested<ValidationBuilderDSL> {
  return [
    validates('presence'),
    input
  ];
}

export function length(options: { min: number, max?: number }): Nested<ValidationBuilderDSL> {
  return obj({
    length: notnull([validates('numeric'), validates('range', options)])
  });
}

export function range(options: { min?: number, max?: number }): Nested<ValidationBuilderDSL> {
  return notnull([
    validates('numeric'),
    validates('range', options)
  ]);
}
