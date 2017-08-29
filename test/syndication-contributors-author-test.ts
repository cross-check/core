import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("syndication contributors author validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "contributorsAuthor with keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      contributorsAuthor: validates('syndication-contributors-author').keys('syndicating')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ contributorsAuthor: null }, descriptors), [], 'validate({ contributorsAuthor: null })');
    assert.deepEqual(await this.validate({ contributorsAuthor: 'some string' }, descriptors), [], 'validate({ contributorsAuthor: \'some string\' })');
    assert.deepEqual(await this.validate({ contributorsAuthor: { id: 234 }, syndicating: false }, descriptors), [], 'validate({ contributorsAuthor: {id: 234}, syndicating: false })');
    assert.deepEqual(await this.validate({ contributorsAuthor: null, syndicating: true }, descriptors), [{ path: ['contributorsAuthor'], message: 'syndication-contributors-author' }], 'validate({ contributorsAuthor: null, syndicating: true })');
    assert.deepEqual(await this.validate({ contributorsAuthor: { id: 234 }, syndicating: true }, descriptors), [], 'validate({ contributorsAuthor: {id: 234}, syndicating: true })');
    assert.deepEqual(await this.validate({ contributorsAuthor: 234, syndicating: true }, descriptors), [], 'validate({ contributorsAuthor: 234, syndicating: true })');
  }

  @test
  async "contributorsAuthor all present without keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      contributorsAuthor: validates('syndication-contributors-author')
    });

    assert.deepEqual(await this.validate({ contributorsAuthor: null, syndicating: true }, descriptors), [], 'validate({ contributorsAuthor: null, syndicating: true })');
  }
}
