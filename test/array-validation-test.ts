import dsl from '@validations/dsl';
import { array } from '@validations/runtime';

import { QUnitAssert, ValidationTest, module, test } from './support';
import { email, presence, str } from './support/helpers';

@module('Array Validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'an array validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: array(presence.and(email).and(str)).and(presence)
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({ emails: null }, descriptors), [{ path: ['emails'], message: 'presence' }], 'validate({ email: null })');
    assert.deepEqual(await this.validate({ emails: [null] }, descriptors), [{ path: ['emails', '0'], message: 'presence' }], 'validate({ emails: [null] })');
    assert.deepEqual(await this.validate({ emails: [{}, null, 'wycats@example.com', 'notemail'] }, descriptors), [{ path: ['emails', '0'], message: 'string' }, { path: ['emails', '1'], message: 'presence' }, { path: ['emails', '3'], message: 'format' }], 'validate({ emails: [null] })');
  }
}
