import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';

const yearFormat = /^\d{4}$/;

export function year(): Nested<ValidationBuilderDSL> {
  return [
    validates('string'),
    validates('format', yearFormat)
  ];
}
