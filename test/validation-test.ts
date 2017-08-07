import dsl, { validates } from '@validations/dsl';

import { ValidationTest, QUnitAssert, module, test } from './support';

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
}
