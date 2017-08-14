import dsl from '@validations/dsl';
import { url } from '@validations/core';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("URL validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url()
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
    assert.deepEqual(await this.validate({ slug: ' http://some-whitespace.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \' http://some-whitespace.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'http://some-whitespace.com/url ' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://some-whitespace.com/url \' })');
    assert.deepEqual(await this.validate({ slug: ' http://some-whitespace.com/url ' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \' http://some-whitespace.com/url \' })');
    assert.deepEqual(await this.validate({ slug: 'http://some-whitespa ce.c om/u rl' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://some-whitespa ce.c om/u rl\' })');
    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url/test\' })');
  }

  @test
  async "relative url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url('relative')
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');

    // technically this is a relative url.
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [], 'validate({ slug: \'http:/bad-url.com/url\' })');

    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [], 'validate({ slug: \'relative-url/test\' })');
  }

  @test
  async "absolute url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url('absolute')
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url/test\' })');
  }

  @test
  async "secure url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url('https')
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url/test\' })');
  }

  @test
  async "non-secure url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url('http')
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url/test\' })');
  }

  @test
  async "protocol-relative url validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      slug: [
        url('protocol-relative')
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
    assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
    assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'https://not-a-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [], 'validate({ slug: \'//protocol-relative.com/url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url\' })');
    assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'relative-url/test\' })');
  }

  // @test
  // async "multiple url validator"(assert: QUnitAssert) {
  //   let descriptors = dsl({
  //     slug: [
  //       url(['relative', 'https'])
  //     ]
  //   });
  //
  //   assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
  //   assert.deepEqual(await this.validate({ slug: null }, descriptors), [], 'validate({ slug: null })');
  //   assert.deepEqual(await this.validate({ slug: {} }, descriptors), [{ path: ['slug'], message: 'string' }], 'validate({ slug: {} })');
  //   assert.deepEqual(await this.validate({ slug: 'http:/bad-url.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http:/bad-url.com/url\' })');
  //   assert.deepEqual(await this.validate({ slug: 'http://not-a-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'http://not-a-relative.com/url\' })');
  //   assert.deepEqual(await this.validate({ slug: 'https://not-a-relative.com/url' }, descriptors), [], 'validate({ slug: \'https://not-a-relative.com/url\' })');
  //   assert.deepEqual(await this.validate({ slug: '//protocol-relative.com/url' }, descriptors), [{ path: ['slug'], message: 'format' }], 'validate({ slug: \'//protocol-relative.com/url\' })');
  //   assert.deepEqual(await this.validate({ slug: 'relative-url' }, descriptors), [], 'validate({ slug: \'relative-url\' })');
  //   assert.deepEqual(await this.validate({ slug: 'relative-url/test' }, descriptors), [], 'validate({ slug: \'relative-url/test\' })');
  // }


}
