import { SingleFieldValidator, Opaque, SingleFieldError } from '@validations/core';
import dsl, { validates } from '@validations/dsl';

import { moduleForValidations, validator, validate } from './support';

const { test } = QUnit;

moduleForValidations('Validators');

function validators() {
  @validator('presence')
  class PresenceValidator extends SingleFieldValidator<ReadonlyArray<never>> {
    validate(value: Opaque, error: SingleFieldError): void {
      if (value === null || value === undefined) {
        error.set('presence');
      }
    }
  }

  @validator('length')
  class LengthValidator extends SingleFieldValidator<[{ min?: number, max?: number }]> {
    validate(_value: Opaque, error: SingleFieldError): void {
      let length = this.getSubProperty('length');

      if (typeof length === 'number') {
        let [ { min = 0, max = Infinity } ] = this.args;

        if (length < min || length > max) {
          error.set('length');
        }
      }
    }
  }

  return { PresenceValidator, LengthValidator };
}

test("a presence validator", async assert => {
  validators();

  let descriptors = dsl({
    name: validates('presence')
  });

  let failure = [
    { path: ['name'], message: 'presence' }
  ];

  assert.deepEqual(await validate(null, descriptors), failure, 'validate(null)');
  assert.deepEqual(await validate({}, descriptors), failure, 'validate({})');

  assert.deepEqual(await validate({ name: 'hello' }, descriptors), [], `validate({ name: 'hello' })`);
  assert.deepEqual(await validate({ name: null }, descriptors), failure, `validate({ name: null })`);
});

test("a length validator", async assert => {
  validators();

  let descriptors = dsl({
    emails: [
      validates('presence'),
      validates('length', { min: 1 })
    ]
  });

  assert.deepEqual(await validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
  assert.deepEqual(await validate({ emails: null }, descriptors), [{ path: ['emails'], message: 'presence' }]);
  assert.deepEqual(await validate({ emails: [] }, descriptors), [{ path: ['emails'], message: 'length' }]);
  assert.deepEqual(await validate({ emails: ["wycats@example.com"] }, descriptors), []);
});
