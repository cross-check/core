import dsl from '@validations/dsl';
import { array } from '@validations/core';

import { ValidationTest, QUnitAssert, module, test } from './support';
import { present, email, string } from './support/helpers';

@module("Array Validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "an array validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: present(array(present(email).add(string)))
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({ emails: null }, descriptors), [{ path: ['emails'], message: 'presence' }], 'validate({ email: null })');
    assert.deepEqual(await this.validate({ emails: [null] }, descriptors), [{ path: ['emails', '0'], message: 'presence' }], 'validate({ emails: [null] })');
    assert.deepEqual(await this.validate({ emails: [{}, null, "wycats@example.com", 'notemail'] }, descriptors), [{ path: ['emails', '0'], message: 'string' }, { path: ['emails', '1'], message: 'presence' }, { path: ['emails', '3'], message: 'format' }], 'validate({ emails: [null] })');
  }
}
