import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("syndication photos tout validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "photosTout with keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      photosTout: validates('syndication-photos-tout').keys('syndicating')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ photosTout: null }, descriptors), [], 'validate({ photosTout: null })');
    assert.deepEqual(await this.validate({ photosTout: 'some string' }, descriptors), [], 'validate({ photosTout: \'some string\' })');
    assert.deepEqual(await this.validate({ photosTout: { id: 234 }, syndicating: false }, descriptors), [], 'validate({ photosTout: {id: 234}, syndicating: false })');
    assert.deepEqual(await this.validate({ photosTout: null, syndicating: true }, descriptors), [{ path: ['photosTout'], message: 'syndication-photos-tout' }], 'validate({ photosTout: null, syndicating: true })');
    assert.deepEqual(await this.validate({ photosTout: { id: 234 }, syndicating: true }, descriptors), [], 'validate({ photosTout: {id: 234}, syndicating: true })');
    assert.deepEqual(await this.validate({ photosTout: 234, syndicating: true }, descriptors), [], 'validate({ photosTout: 234, syndicating: true })');
  }

  @test
  async "photosTout without keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      photosTout: validates('syndication-photos-tout')
    });

    assert.deepEqual(await this.validate({ photosTout: null, syndicating: true }, descriptors), [], 'validate({ photosTout: null, syndicating: true })');
  }
}
