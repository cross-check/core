import dsl from '@validations/dsl';
import { year } from '@validations/runtime';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('year validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'year validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      releaseYear: [
        year()
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ releaseYear: null }, descriptors), [], 'validate({ releaseYear: null })');
    assert.deepEqual(await this.validate({ releaseYear: 123 }, descriptors), [{ path: ['releaseYear'], message: 'string' }], 'validate({ releaseYear: {} })');
    assert.deepEqual(await this.validate({ releaseYear: '123' }, descriptors), [{ path: ['releaseYear'], message: 'format' }], 'validate({ releaseYear: 123 })');
    assert.deepEqual(await this.validate({ releaseYear: '2017' }, descriptors), [], 'validate({ releaseYear: \'2017\' })');
    assert.deepEqual(await this.validate({ releaseYear: '1234' }, descriptors), [], 'validate({ releaseYear: \'1234\' })');
    assert.deepEqual(await this.validate({ releaseYear: '6789' }, descriptors), [], 'validate({ releaseYear: \'1234\' })');
  }
}
