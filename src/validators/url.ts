import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';



export function url(options: Nested<string> | undefined): Nested<ValidationBuilderDSL> {
  let formats: ValidationBuilderDSL[] = [];

  if (options === undefined) {
    formats.push(validates('foramt', ))
  }

  return [
    validates('string'),
    ...formats
  ];
}
