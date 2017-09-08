import validates from '@validations/dsl';
import { array, presence, string } from '@validations/runtime';

import { QUnitAssert, ValidationTest, module, test } from './support';
import { email } from './support/helpers';

@module('Array Validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'an array validator'(assert: QUnitAssert) {
    let descriptors = validates(
      presence().and(array(presence().and(email()).and(string())))
    );

    assert.deepEqual(await this.validate(null, descriptors), [{ path: [], message: { key: 'presence', args: null } }], 'validate(null)');
    assert.deepEqual(await this.validate([null], descriptors), [{ path: ['0'], message: { key: 'presence', args: null } }], 'validate([null])');
    assert.deepEqual(await this.validate([{}, null, 'wycats@example.com', 'notemail'], descriptors), [
      { path: ['0'], message: { key: 'string', args: null } },
      { path: ['1'], message: { key: 'presence', args: null } },
      { path: ['3'], message: { key: 'format', args: null } }
    ], 'validate({ emails: [null] })');
  }
}
