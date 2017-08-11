import {
  NoArgs, Opaque, validateFlattened, ValidationError,
  Validator
} from "@validations/core";
import {validates, ValidationBuilderDSL, ValidationDescriptor, ValidationDescriptors} from "@validations/dsl";
import Task from "no-show/dist/types/task";
import { Nested } from '@validations/dsl/src/utils';
import { SingleFieldValidator, SingleFieldError } from './single-field';

export class ArrayValidator extends SingleFieldValidator<NoArgs> {
  protected normalized: ValidationDescriptor[];

  validate(value: Opaque, error: SingleFieldError): void {
    // ignore null/undefined
    if (Array.isArray(value) || value === null || value === undefined) return;

    error.set('array');
  }
}

// export class ItemsValidator extends Validator<[ValidationDescriptors]> {
//   protected normalized: ValidationDescriptors;
//
//   run(): Task<ValidationError[]> {
//     let { value, item } = this;
//
//     return new Task(async run => {
//       let errors: ValidationError[] = [];
//
//       if (Array.isArray(value)) {
//         let { arg, env } = this;
//
//          value.forEach(async item => {
//            let suberrors = await run(validateFlattened(env, value, item));
//
//            for (let error of suberrors) {
//              errors.push({ message: error.message, path: [item, ...error.path] });
//            }
//          });
//
//
//       }
//
//       return errors;
//     });
//   }
// }

export function array(itemValidations: Nested<ValidationBuilderDSL>): Nested<ValidationBuilderDSL> {
  return [
    validates('array')/*,
    validates('items', itemValidations)*/
  ]
}
