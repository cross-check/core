import dsl from '@validations/dsl';
import { geo } from '@validations/runtime';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('Geographical Validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'geo validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      geo: geo()
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({ geo: null }, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate({ geo: null })');
    assert.deepEqual(await this.validate({ geo: { lat: null, long: null } }, descriptors), [{ path: ['geo', 'lat'], message: 'presence' }, { path: ['geo', 'long'], message: 'presence' }], 'validate({ geo: { lat: null, long: null } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: {} } }, descriptors), [{ path: ['geo', 'long'], message: 'numeric' }], 'validate({ geo: { lat: 0, long: {} } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: 300 } }, descriptors), [{ path: ['geo', 'long'], message: 'range' }], 'validate({ geo: { lat: 0, long: 300 } })');
  }

}
