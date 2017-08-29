import dsl from '@validations/dsl';
import { numberOrPercentage } from '@validations/core';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("email validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "email validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      width: [
        numberOrPercentage()
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ width: null }, descriptors), [], 'validate({ width: null })');
    assert.deepEqual(await this.validate({ width: {} }, descriptors), [{ path: ['width'], message: 'string' }], 'validate({ width: {} })');
    assert.deepEqual(await this.validate({ width: 123 }, descriptors), [{ path: ['width'], message: 'string' }], 'validate({ width: 123 })');
    assert.deepEqual(await this.validate({ width: '123' }, descriptors), [], 'validate({ width: \`123\` })');
    assert.deepEqual(await this.validate({ width: '123%' }, descriptors), [], 'validate({ width: \`123%\` })');
    assert.deepEqual(await this.validate({ width: '1%' }, descriptors), [], 'validate({ width: \`123%\` })');
    assert.deepEqual(await this.validate({ width: '123%1' }, descriptors), [{ path: ['width'], message: 'format' }], 'validate({ width: \`123%1\` })');
    assert.deepEqual(await this.validate({ width: '%' }, descriptors), [{ path: ['width'], message: 'format' }], 'validate({ width: \`%\` })');
    assert.deepEqual(await this.validate({ width: 'a123%' }, descriptors), [{ path: ['width'], message: 'format' }], 'validate({ width: \`a123%1\` })');
    assert.deepEqual(await this.validate({ width: 'test' }, descriptors), [{ path: ['width'], message: 'format' }], 'validate({ width: \`test\` })');
  }
}
