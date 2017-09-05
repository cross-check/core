import { ValidationBuilder, validates } from '@validations/dsl';
import { obj } from '@validations/runtime';

export function geo(): ValidationBuilder {
  return validates('presence').and(
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
  );
}
