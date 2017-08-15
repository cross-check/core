import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';

const emailFormat = /^([^\s]+)@([^\s]+){2,}\.([^\s]+){2,}$/;

export function date(): Nested<ValidationBuilderDSL> {
  return [
    validates('string'),
    validates('format', emailFormat)
  ];
}
