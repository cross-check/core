import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("numeric validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "numeric validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      body: validates('markdown-links')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ body: null }, descriptors), [], 'validate({ body: null })');
    assert.deepEqual(await this.validate({ body: 123 }, descriptors), [], 'validate({ body: 123 })');
    assert.deepEqual(await this.validate({ body: {} }, descriptors), [], 'validate({ body: {} })');
    assert.deepEqual(await this.validate({ body: 'words, lots of words, so many words. A lot of words.' }, descriptors), [], 'validate({ body: \'words, lots of words, so many words. A lot of words.\' })');
    assert.deepEqual(await this.validate({ body: 'words, with one markdown [link](https://www.test.com) in them.' }, descriptors), [], 'validate({ body: \'words, with one markdown [link](https://www.test.com) in them.\' })');
    assert.deepEqual(await this.validate({ body: 'words, with one malformed markdown [link](www.test.com) in them.' }, descriptors), [{ path: ['body'], message: 'markdown-links' }], 'validate({ body: \'words, with one malformed markdown [link](www.test.com) in them.\' })');
  }
}
