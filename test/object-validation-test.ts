import dsl, { validates } from '@validations/dsl';
import { length, notnull, obj, range } from '@validations/runtime';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('Object Validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'an obj validator'(assert: QUnitAssert) {
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

  @test
  async 'an obj range validator'(assert: QUnitAssert) {
    let descriptors = dsl({
      geo: [
        notnull(obj({
          lat: range({ min: -90, max: 90 }),
          long: range({ min: -180, max: 180 })
        }))
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate(null)');
    assert.deepEqual(await this.validate({ geo: null }, descriptors), [{ path: ['geo'], message: 'presence' }], 'validate({ geo: null })');
    assert.deepEqual(await this.validate({ geo: { lat: null, long: null } }, descriptors), [{ path: ['geo', 'lat'], message: 'presence' }, { path: ['geo', 'long'], message: 'presence' }], 'validate({ geo: { lat: null, long: null } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: {} } }, descriptors), [{ path: ['geo', 'long'], message: 'numeric' }], 'validate({ geo: { lat: 0, long: {} } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: 300 } }, descriptors), [{ path: ['geo', 'long'], message: 'range' }], 'validate({ geo: { lat: 0, long: 300 } })');
  }

  @test
  async 'an obj length validator'(assert: QUnitAssert) {

    let descriptors = dsl({
      emails: [
        length({ min: 1, max: 3 })
      ]
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ emails: null }, descriptors), [], 'validate({ emails: null })');
    assert.deepEqual(await this.validate({ emails: {} }, descriptors), [{ path: ['emails', 'length'], message: 'presence' }], 'validate({ emails: {} })');
    assert.deepEqual(await this.validate({ emails: { length: 2 } }, descriptors), [], 'validate({ emails: { length: 2 } })');
    assert.deepEqual(await this.validate({ emails: [] }, descriptors), [{ path: ['emails', 'length'], message: 'range' }], 'validate({ emails: [] } })');
    assert.deepEqual(await this.validate({ emails: ['jimmy@gmail.com'] }, descriptors), [], 'validate({ emails: [\'jimmy@gmail.com\'] })');

    let failureMessage = 'validate({ emails: [\'jimmy@gmail.com\', \'sally@gmail.com\', \'buddy@gmail.com\', \'harry@gmail.com\'] } })';
    let testDSL = { emails: ['jimmy@gmail.com', 'sally@gmail.com', 'buddy@gmail.com', 'harry@gmail.com'] };
    let expected = [{ path: ['emails', 'length'], message: 'range' }];
    assert.deepEqual(await this.validate(testDSL, descriptors), expected, failureMessage);
  }
}
