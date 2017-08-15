import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("string validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "string validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      name: validates('string')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ name: null }, descriptors), [], 'validate({ name: null })');
    assert.deepEqual(await this.validate({ name: 'Mr. Joe' }, descriptors), [], 'validate({ name: \'Mr. Joe\' })');
    assert.deepEqual(await this.validate({ name: 123 }, descriptors), [{ path: ['name'], message: 'string' }], 'validate({ name: 123 })');
    assert.deepEqual(await this.validate({ name: {} }, descriptors), [{ path: ['name'], message: 'string' }], 'validate({ name: {} })');
  }
}
