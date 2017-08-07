import { SingleFieldValidator, Opaque, SingleFieldError } from '@validations/core';
import dsl, { validates } from '@validations/dsl';

import { ValidatorDecorator, ValidationTest, QUnitAssert, module, test } from './support';

@module("Single Field Validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "a presence validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      name: validates('presence')
    });

    let failure = [
      { path: ['name'], message: 'presence' }
    ];

    assert.deepEqual(await this.validate(null, descriptors), failure, 'validate(null)');
    assert.deepEqual(await this.validate({}, descriptors), failure, 'validate({})');


    assert.deepEqual(await this.validate({ name: 'hello' }, descriptors), [], `validate({ name: 'hello' })`);
    assert.deepEqual(await this.validate({ name: null }, descriptors), failure, `validate({ name: null })`);
  }

  @test
  async "a length validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: [
        validates('presence'),
        validates('length', { min: 1 })
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
    assert.deepEqual(await this.validate({ emails: null }, descriptors), [{ path: ['emails'], message: 'presence' }]);
    assert.deepEqual(await this.validate({ emails: [] }, descriptors), [{ path: ['emails'], message: 'length' }]);
    assert.deepEqual(await this.validate({ emails: ["wycats@example.com"] }, descriptors), []);
  }

  // The `any` here and the return in the body of the function is working around a typescript
  // limitation that prevents us from decorating a class expression.
  //
  // see https://github.com/Microsoft/TypeScript/issues/9448#issuecomment-320779210
  protected define(validator: ValidatorDecorator): any {
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
}
