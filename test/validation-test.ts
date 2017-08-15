import dsl, { validates } from '@validations/dsl';
import { length } from '@validations/core';

import { ValidationTest, QUnitAssert, module, test } from './support';

@module("Single Field Validators")
export class ValidatorTest extends ValidationTest {
  @test


  @test
  async "a length validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: [
        validates('presence'),
        length({ min: 1 })
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
    assert.deepEqual(await this.validate({ emails: null }, descriptors), [{ path: ['emails'], message: 'presence' }]);
    assert.deepEqual(await this.validate({ emails: [] }, descriptors), [{ path: ['emails', 'length'], message: 'range' }]);
    assert.deepEqual(await this.validate({ emails: ["wycats@example.com"] }, descriptors), []);
  }
}
