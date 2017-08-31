import dsl, { validates } from '@validations/dsl';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('date validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'date validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      releaseDate: validates('date')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ releaseDate: null }, descriptors), [], 'validate({ releaseDate: null })');
    assert.deepEqual(await this.validate({ releaseDate: '123' }, descriptors), [{ path: ['releaseDate'], message: 'date' }], 'validate({ releaseDate: \'123\' })');
    assert.deepEqual(await this.validate({ releaseDate: '1502819709696' }, descriptors), [{ path: ['releaseDate'], message: 'date' }], 'validate({ releaseDate: \'1502819709696\' })');
    assert.deepEqual(await this.validate({ releaseDate: 123 }, descriptors), [], 'validate({ releaseDate: 123 })');
    assert.deepEqual(await this.validate({ releaseDate: '2017-01-01' }, descriptors), [], 'validate({ releaseDate: \'2017-01-01\' })');
    assert.deepEqual(await this.validate({ releaseDate: 1502819709696 }, descriptors), [], 'validate({ releaseDate: 1502819709696 })');
    assert.deepEqual(await this.validate({ releaseDate: '1899-12-31' }, descriptors), [{ path: ['releaseDate'], message: 'date' }], 'validate({ releaseDate: \'1899-12-31\' })');
    assert.deepEqual(await this.validate({ releaseDate: '3001-12-31' }, descriptors), [{ path: ['releaseDate'], message: 'date' }], 'validate({ releaseDate: \'3001-12-31\' })');
    assert.deepEqual(await this.validate({ releaseDate: '3-24-1995' }, descriptors), [], 'validate({ releaseDate: \'3-24-1995\' })');
    assert.deepEqual(await this.validate({ releaseDate: '03-24-1995' }, descriptors), [], 'validate({ releaseDate: \'03-24-1995\' })');
    assert.deepEqual(await this.validate({ releaseDate: 'not a date' }, descriptors), [{ path: ['releaseDate'], message: 'date' }], 'validate({ releaseDate: \'not a date\' })');
  }
}
