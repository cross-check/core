import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("canonical url validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "canonical validator with keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      canonical: validates('canonical-url').keys('contentSource')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ canonical: null }, descriptors), [], 'validate({ canonical: null })');
    assert.deepEqual(await this.validate({ canonical: 'http://www.test.com' }, descriptors), [], 'validate({ canonical: \'http://www.test.com\' })');
    assert.deepEqual(await this.validate({ canonical: 'http://www.test.com', contentSource: 'random-place' }, descriptors), [], 'validate({ canonical: \'http://www.test.com\', contentSource: \'random-place\' })');
    assert.deepEqual(await this.validate({ canonical: '', contentSource: 'random-place' }, descriptors), [], 'validate({ canonical: \'\', contentSource: \'random-place\' })');
    assert.deepEqual(await this.validate({ canonical: null, contentSource: 'random-place' }, descriptors), [], 'validate({ canonical: null, contentSource: \'random-place\' })');
    assert.deepEqual(await this.validate({ contentSource: 'random-place' }, descriptors), [], 'validate({ contentSource: \'random-place\' })');
    assert.deepEqual(await this.validate({ canonical: 'http://www.test.com', contentSource: 'external_partner' }, descriptors), [], 'validate({ canonical: \'http://www.test.com\', contentSource: \'external_partner\' })');
    assert.deepEqual(await this.validate({ canonical: 'http://www.test.com', contentSource: 'licensed_partner' }, descriptors), [], 'validate({ canonical: \'http://www.test.com\', contentSource: \'licensed_partner\' })');
    assert.deepEqual(await this.validate({ canonical: 'not a url', contentSource: 'licensed_partner' }, descriptors), [], 'validate({ canonical: \'not a url\', contentSource: \'licensed_partner\' })');
    assert.deepEqual(await this.validate({ canonical: '', contentSource: 'licensed_partner' }, descriptors), [{ path: ['canonical'], message: 'canonical-url' }], 'validate({ canonical: \'\', contentSource: \'licensed_partner\' })');
    assert.deepEqual(await this.validate({ canonical: null, contentSource: 'licensed_partner' }, descriptors), [{ path: ['canonical'], message: 'canonical-url' }], 'validate({ canonical: null, contentSource: \'licensed_partner\' })');
    assert.deepEqual(await this.validate({ contentSource: 'licensed_partner' }, descriptors), [{ path: ['canonical'], message: 'canonical-url' }], 'validate({ contentSource: \'licensed_partner\' })');
  }

  @test
  async "canonical validator without keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      canonical: validates('canonical-url')
    });

    assert.deepEqual(await this.validate({ canonical: null, contentSource: 'licensed_partner' }, descriptors), [], 'validate({ canonical: null, contentSource: \'licensed_partner\' })');
  }
}
