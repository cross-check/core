import dsl, { validates } from '@validations/dsl';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('numeric validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'numeric validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      age: validates('numeric')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ age: null }, descriptors), [], 'validate({ age: null })');
    assert.deepEqual(await this.validate({ age: 'words' }, descriptors), [{ path: ['age'], message: 'numeric' }], 'validate({ age: \'words\' })');
    assert.deepEqual(await this.validate({ age: {} }, descriptors), [{ path: ['age'], message: 'numeric' }], 'validate({ age: {} })');
    assert.deepEqual(await this.validate({ age: 123 }, descriptors), [], 'validate({ age: 123 })');
  }
}
