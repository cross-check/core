import dsl from '@validations/dsl';
import { email } from '@validations/core';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("email validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "email validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      primaryEmail: [
        email()
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ primaryEmail: null }, descriptors), [], 'validate({ primaryEmail: null })');
    assert.deepEqual(await this.validate({ primaryEmail: {} }, descriptors), [{ path: ['primaryEmail'], message: 'string' }], 'validate({ primaryEmail: {} })');
    assert.deepEqual(await this.validate({ primaryEmail: 123 }, descriptors), [{ path: ['primaryEmail'], message: 'string' }], 'validate({ primaryEmail: 123 })');
    assert.deepEqual(await this.validate({ primaryEmail: 'not an email' }, descriptors), [{ path: ['primaryEmail'], message: 'format' }], 'validate({ primaryEmail: \'not an email\' })');
    assert.deepEqual(await this.validate({ primaryEmail: ' whitespace@in-email.com' }, descriptors), [{ path: ['primaryEmail'], message: 'format' }], 'validate({ primaryEmail: \' whitespace@in-email.com\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'whitespace@in-email.com ' }, descriptors), [{ path: ['primaryEmail'], message: 'format' }], 'validate({ primaryEmail: \'whitespace@in-email.com \' })');
    assert.deepEqual(await this.validate({ primaryEmail: ' whitespace@in-email.com ' }, descriptors), [{ path: ['primaryEmail'], message: 'format' }], 'validate({ primaryEmail: \' whitespace@in-email.com \' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'whitespace@in- email .co m' }, descriptors), [{ path: ['primaryEmail'], message: 'format' }], 'validate({ primaryEmail: \'whitespace@in- email .co m\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'weird_formatting@email@still-valid-though.com' }, descriptors), [], 'validate({ primaryEmail: \'weird_formatting@email@still-valid-though.com\' })');
    assert.deepEqual(await this.validate({ primaryEmail: '1234@8484.83' }, descriptors), [], 'validate({ primaryEmail: \'1234@8484.83\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'a-good@email.com' }, descriptors), [], 'validate({ primaryEmail: \'a-good@email.com\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'anotherDecent@gmail.com' }, descriptors), [], 'validate({ primaryEmail: \'anotherDecent@gmail.com\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'professor@dumbledore.net' }, descriptors), [], 'validate({ primaryEmail: \'professor@dumbledore.net\' })');
    assert.deepEqual(await this.validate({ primaryEmail: 'john24@internet.io' }, descriptors), [], 'validate({ primaryEmail: \'john24@internet.io\' })');
  }
}
