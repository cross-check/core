import dsl, { validates } from '@validations/dsl';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('presence validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'presence validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      name: validates('presence')
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['name'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({}, descriptors), [{ path: ['name'], message: 'presence' }], 'validate({})');
    assert.deepEqual(await this.validate({ name: null }, descriptors), [{ path: ['name'], message: 'presence' }], 'validate({ name: null })');
    assert.deepEqual(await this.validate({ name: undefined }, descriptors), [{ path: ['name'], message: 'presence' }], 'validate({ name: undefined })');
    assert.deepEqual(await this.validate({ name: 'words' }, descriptors), [], 'validate({ name: \'words\' })');
    assert.deepEqual(await this.validate({ name: 123 }, descriptors), [], 'validate({ name: 123 })');
  }

}
