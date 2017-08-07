import { Task } from 'no-show';
import normalizeDSL, { ValidationDescriptor, FieldsDSL, ValidationDescriptors, ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';
import { Validator, ValidationError, NoArgs } from '../validator';
import { SingleFieldValidator, SingleFieldError } from './single-field';
import { validateFlattened } from '../validate';
import { Opaque } from '../utils';

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
    let { value } = this;

    return new Task(async run => {
      let errors: ValidationError[] = [];

      if (typeof value === 'object' && value !== null) {
        let { arg, env } = this;

        for (let key of Object.keys(arg)) {
          await run(validateFlattened(env, value, arg[key]));
        }
      }

      return errors;
    });
  }
}

export function obj(dsl: FieldsDSL): Nested<ValidationBuilderDSL> {
  return [
    validates('object'),
    validates('fields', normalizeDSL(dsl))
  ]
}
