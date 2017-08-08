import dsl, { validates } from '@validations/dsl';
import { obj } from '@validations/core';

import { ValidationTest, QUnitAssert, module, test } from './support';

@module("Object Validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "an obj validator"(assert: QUnitAssert) {
    let descriptors = dsl({
      geo: [
        validates('presence'),
        obj({
          lat: [
            validates('presence'),
            validates('numeric'),
            validates('range', { min: -90, max: 90 })
          ],

          long: [
            validates('presence'),
            validates('numeric'),
            validates('range', { min: -180, max: 180 })
          ]
        })
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({ geo: null }, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate({ geo: null })');
    assert.deepEqual(await this.validate({ geo: { lat: null, long: null } }, descriptors), [{ path: ['geo', 'lat'], message: 'presence' }, { path: ['geo', 'long'], message: 'presence' }], 'validate({ geo: { lat: null, long: null } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: {} } }, descriptors), [{ path: ['geo', 'long'], message: 'numeric' }], 'validate({ geo: { lat: 0, long: {} } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: 300 } }, descriptors), [{ path: ['geo', 'long'], message: 'range' }], 'validate({ geo: { lat: 0, long: 300 } })');
  }
}
