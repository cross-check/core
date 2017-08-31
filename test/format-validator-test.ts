import dsl, { validates } from '@validations/dsl';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('format validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'regex format validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      age: validates('format', /^\d+$/) // one or more only digits
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ age: null }, descriptors), [], 'validate({ age: null })');
    assert.deepEqual(await this.validate({ age: 'Mr. Joe' }, descriptors), [{ path: ['age'], message: 'format' }], 'validate({ age: \'Mr. Joe\' })');
    assert.deepEqual(await this.validate({ age: 123 }, descriptors), [], 'validate({ age: 123 })');
    assert.deepEqual(await this.validate({ age: '123' }, descriptors), [], 'validate({ age: \'123\' })');
    assert.deepEqual(await this.validate({ age: '123a' }, descriptors), [{ path: ['age'], message: 'format' }], 'validate({ age: \'123a\' })');
  }

  @test
  async 'regex format validator showing that it ignores non-strings'(assert: QUnitAssert) {
    let descriptors = dsl({
      name: validates('format', /^\D+$/) // one or more no digits
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ name: null }, descriptors), [], 'validate({ name: null })');
    assert.deepEqual(await this.validate({ name: 'Mr. Joe' }, descriptors), [], 'validate({ name: \'Mr. Joe\' })');
    assert.deepEqual(await this.validate({ name: 123 }, descriptors), [], 'validate({ name: 123 })');
    assert.deepEqual(await this.validate({ name: '123' }, descriptors), [{ path: ['name'], message: 'format' }], 'validate({ name: \'123\' })');
    assert.deepEqual(await this.validate({ name: 'test123a' }, descriptors), [{ path: ['name'], message: 'format' }], 'validate({ name: \'test123a\' })');
  }
}
