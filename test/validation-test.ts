import { Validator, SingleFieldValidator, Opaque, SingleFieldError, validate, register, ValidatorClass } from '@validations/core';
import dsl, { validates } from '@validations/dsl';
import { Task } from 'no-show';

const { test } = QUnit;

QUnit.module("Validator");

test("a presence validator", async assert => {
  @validator('presence')
  class PresenceValidator extends SingleFieldValidator {
    validate(value: Opaque, error: SingleFieldError): void {
      if (value === null || value === undefined) {
        error.set('presence');
      }
    }
  }

  let descriptors = dsl({
    name: validates('presence', PresenceValidator)
  });

  let failure = [
    { path: ['name'], message: 'presence' }
  ];

  assert.deepEqual(await validate(null, descriptors), failure, 'validate(null)');
  assert.deepEqual(await validate({}, descriptors), failure, 'validate({})');

  assert.deepEqual(await validate({ name: 'hello' }, descriptors), [], `validate({ name: 'hello' })`);
  assert.deepEqual(await validate({ name: null }, descriptors), failure, `validate({ name: null })`);
});

function validator(name: string) {
  return function(constructor: ValidatorClass) {
    register(name, constructor);
  }
}
