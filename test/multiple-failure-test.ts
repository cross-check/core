import dsl, { validates } from '@validations/dsl';
import { QUnitAssert, ValidationTest, module, test } from './support';

@module('multiple failed validators')
export class ValidatorTest extends ValidationTest {
  @test
  async 'multiple failed validators'(assert: QUnitAssert) {
    let descriptors = dsl({
      firstName: validates('string'),
      lastName: validates('string')
    });

    assert.deepEqual(await this.validate({ firstName: 1, lastName: 1 }, descriptors), [{ path: ['firstName'], message: 'string' }, { path: ['lastName'], message: 'string' }], 'validate({ firstName: 1, lastName: 1 })');
  }
}
