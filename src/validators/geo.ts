import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';
import { obj } from "@validations/core";

export function geo(): Nested<ValidationBuilderDSL> {
  return [
    validates('presence'),
    obj({
      lat: [
        validates('presence'),
        validates('numeric'),
        validates('range', { min: -90, max: 90 })
      ],

      long: [
        validates('presence'),
        validates('numeric'),
        validates('range', { min: -180, max: 180 })
      ]
    })
  ];
}
