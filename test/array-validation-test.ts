import dsl, { validates } from '@validations/dsl';
import {obj, notnull, length, range, array} from '@validations/core';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("Array Validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "an array validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      numbers: array()
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ numbers: null }, descriptors), [], 'validate({ numbers: null })');
    assert.deepEqual(await this.validate({ numbers: {} }, descriptors), [{ path: ['numbers'], message: 'array' }], 'validate({ numbers: {} })');
    assert.deepEqual(await this.validate({ numbers: 'this is not an array!' }, descriptors), [{ path: ['numbers'], message: 'array' }], 'validate({ numbers: \'this is not an array!\' })');
    assert.deepEqual(await this.validate({ numbers: [] }, descriptors), [], 'validate({ numbers: [] })');
    assert.deepEqual(await this.validate({ numbers: [1,2,3] }, descriptors), [], 'validate({ numbers: [1,2,3] })');
    assert.deepEqual(await this.validate({ numbers: ['hey', 'hi', 'how are you'] }, descriptors), [], 'validate({ numbers: [\'hey\', \'hi\', \'how are you\'] })');
 }

 @test
  async "an array validator with validations for each item within the array"(assert: QUnitAssert) {
    let descriptors = dsl({
      numbers: array(validates('numeric'))
    });

    assert.deepEqual(await this.validate({ numbers: [1,2,3] }, descriptors), [], 'validate({ numbers: [1,2,3] })');
    assert.deepEqual(await this.validate({ numbers: ['hey', 'hi', 'how are you'] }, descriptors), [{ path: ['numbers', 'item'], message: 'numeric' }], 'validate({ numbers: [\'hey\', \'hi\', \'how are you\'] })');
 }
}
