import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("range validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "range validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      age: validates('range', {min: 0, max: 130})
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ age: null }, descriptors), [], 'validate({ age: null })');
    assert.deepEqual(await this.validate({ age: 'Mr. Joe' }, descriptors), [], 'validate({ age: \'Mr. Joe\' })');
    assert.deepEqual(await this.validate({ age: '-100' }, descriptors), [], 'validate({ age: \'-100\' })');
    assert.deepEqual(await this.validate({ age: '123' }, descriptors), [], 'validate({ age: \'123\' })');
    assert.deepEqual(await this.validate({ age: 123 }, descriptors), [], 'validate({ age: 123 })');
    assert.deepEqual(await this.validate({ age: -1 }, descriptors), [{ path: ['age'], message: 'range' }], 'validate({ age: -1 })');
    assert.deepEqual(await this.validate({ age: -0.5 }, descriptors), [{ path: ['age'], message: 'range' }], 'validate({ age: -0.5 })');
    assert.deepEqual(await this.validate({ age: 0 }, descriptors), [], 'validate({ age: 0 })');
    assert.deepEqual(await this.validate({ age: 0.5 }, descriptors), [], 'validate({ age: 0.5 })');
    assert.deepEqual(await this.validate({ age: 1 }, descriptors), [], 'validate({ age: 1 })');
    assert.deepEqual(await this.validate({ age: 129 }, descriptors), [], 'validate({ age: 129 })');
    assert.deepEqual(await this.validate({ age: 129.5 }, descriptors), [], 'validate({ age: 129.5 })');
    assert.deepEqual(await this.validate({ age: 130 }, descriptors), [], 'validate({ age: 130 })');
    assert.deepEqual(await this.validate({ age: 130.5 }, descriptors), [{ path: ['age'], message: 'range' }], 'validate({ age: 130.5 })');
    assert.deepEqual(await this.validate({ age: 131 }, descriptors), [{ path: ['age'], message: 'range' }], 'validate({ age: 131 })');
  }
}
