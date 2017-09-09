import { ValidationError } from '@validations/core';
import validates from '@validations/dsl';
import { validators } from '@validations/runtime';
import { QUnitAssert, ValidationTest, module, test } from './support';

const ERR = [{ path: [], message: { key: 'date', args: null } }];
const NO_ERR: ValidationError[] = [];

@module('date validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'date validator'(assert: QUnitAssert) {
    let validation = validates(
      validators.date()
    );

    assert.deepEqual(await this.validate(null, validation), NO_ERR, 'validate(null)');
    assert.deepEqual(await this.validate('123', validation), ERR, 'validate({ releaseDate: \'123\' })');
    assert.deepEqual(await this.validate('1502819709696', validation), ERR, 'validate({ releaseDate: \'1502819709696\' })');
    assert.deepEqual(await this.validate(123, validation), NO_ERR, 'validate({ releaseDate: 123 })');
    assert.deepEqual(await this.validate('2017-01-01', validation), NO_ERR, 'validate({ releaseDate: \'2017-01-01\' })');
    assert.deepEqual(await this.validate(1502819709696, validation), NO_ERR, 'validate({ releaseDate: 1502819709696 })');
    assert.deepEqual(await this.validate('1899-12-31', validation), ERR, 'validate({ releaseDate: \'1899-12-31\' })');
    assert.deepEqual(await this.validate('3001-12-31', validation), ERR, 'validate({ releaseDate: \'3001-12-31\' })');
    assert.deepEqual(await this.validate('3-24-1995', validation), NO_ERR, 'validate({ releaseDate: \'3-24-1995\' })');
    assert.deepEqual(await this.validate('03-24-1995', validation), NO_ERR, 'validate({ releaseDate: \'03-24-1995\' })');
    assert.deepEqual(await this.validate('not a date', validation), ERR, 'validate({ releaseDate: \'not a date\' })');
  }
}
