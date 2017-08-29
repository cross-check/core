import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';

const digitsAndMaybePercentage: RegExp = /^[0-9]+%?$/;

export function numberOrPercentage(): Nested<ValidationBuilderDSL> {
  return [
    validates('string'),
    validates('format', digitsAndMaybePercentage)
  ]
}
