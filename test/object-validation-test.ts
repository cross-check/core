import validate from '@validations/dsl';
import { number, obj, presence, range } from '@validations/runtime';
import { unknown } from 'ts-std';
import { QUnitAssert, ValidationTest, module, test } from './support';

function error(key: string, path?: string, args: unknown = null) {
  return { path: path ? path.split('.') : [], message: { key, args }};
}

@module('Object Validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'an obj validator'(assert: QUnitAssert) {
    let validation = validate(
      presence(),
      obj({
        geo: [
          presence(),
          obj({
            lat: [
              presence(),
              number(),
              range({ min: -90, max: 90 })
            ],

            long: [
              presence(),
              number(),
              range({ min: -180, max: 180 })
            ]
          })
        ]
      })
    );

    assert.deepEqual(await this.validate(null, validation), [error('presence')], 'validate(null)');
    assert.deepEqual(await this.validate({ geo: null }, validation), [error('presence', 'geo')], 'validate({ geo: null })');
    assert.deepEqual(await this.validate({ geo: { lat: null, long: null } }, validation), [error('presence', 'geo.lat'), error('presence', 'geo.long')], 'validate({ geo: { lat: null, long: null } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: {} } }, validation), [error('number', 'geo.long')], 'validate({ geo: { lat: 0, long: {} } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: 300 } }, validation), [error('range', 'geo.long', { min: -180, max: 180 })], 'validate({ geo: { lat: 0, long: 300 } })');
  }

  @test
  async 'an obj range validator'(assert: QUnitAssert) {
    let validation = validate(
      presence(),
      obj({
        geo: [
          presence(),
          obj({
            lat: [ presence(), number(), range({ min: -90, max: 90 }) ],
            long: [ presence(), number(), range({ min: -180, max: 180 }) ]
          })
        ]
      })
    );

    assert.deepEqual(await this.validate(null, validation), [error('presence')], 'validate(null)');
    assert.deepEqual(await this.validate({ geo: null }, validation), [error('presence', 'geo')], 'validate({ geo: null })');
    assert.deepEqual(await this.validate({ geo: { lat: null, long: null } }, validation), [error('presence', 'geo.lat'), error('presence', 'geo.long')], 'validate({ geo: { lat: null, long: null } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: {} } }, validation), [error('number', 'geo.long')], 'validate({ geo: { lat: 0, long: {} } })');
    assert.deepEqual(await this.validate({ geo: { lat: 0, long: 300 } }, validation), [error('range', 'geo.long', { min: -180, max: 180 })], 'validate({ geo: { lat: 0, long: 300 } })');
  }

  @test
  async 'an obj length validator'(assert: QUnitAssert) {
    function length(options: { min?: number, max?: number }) {
      return obj({
        length: presence().and(number().and(range(options)))
      });
    }

    let validation = validate(length({ min: 1, max: 3 }));

    assert.deepEqual(await this.validate(null, validation), [], 'validate(null)');
    assert.deepEqual(await this.validate({}, validation), [error('presence', 'length')], 'validate({})');
    assert.deepEqual(await this.validate({ length: 2 }, validation), [], 'validate({ length: 2 })');
    assert.deepEqual(await this.validate([], validation), [error('range', 'length', { min: 1, max: 3 })], 'validate([])');
    assert.deepEqual(await this.validate(['jimmy@gmail.com'], validation), [], 'validate([\'jimmy@gmail.com\'])');

    let failureMessage = `validate(['jimmy@gmail.com', 'sally@gmail.com', 'buddy@gmail.com', 'harry@gmail.com'])`;
    let testDSL = ['jimmy@gmail.com', 'sally@gmail.com', 'buddy@gmail.com', 'harry@gmail.com'];
    let expected = [error('range', 'length', { min: 1, max: 3 })];
    assert.deepEqual(await this.validate(testDSL, validation), expected, failureMessage);
  }
}
