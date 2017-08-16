import dsl, { validates } from '@validations/dsl';

import { ValidationTest, QUnitAssert, module, test } from './support';

@module("validate tests")
export class ValidatorTest extends ValidationTest {
  @test
  async "validate with context"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: [
        validates('presence').on('publish')
      ]
    });

    let matchingContext = 'publish';
    assert.deepEqual(await this.validate(null, descriptors, matchingContext), [{ path: ['emails'], message: 'presence' }]);

    let notMatchingContext = 'update';
    assert.deepEqual(await this.validate(null, descriptors, notMatchingContext), []);

    // no context
    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
  }

  @test
  async "validate with no context"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: [
        validates('presence')
      ]
    });

    let matchingContext = 'publish';
    assert.deepEqual(await this.validate(null, descriptors, matchingContext), [{ path: ['emails'], message: 'presence' }]);

    let notMatchingContext = 'update';
    assert.deepEqual(await this.validate(null, descriptors, notMatchingContext), [{ path: ['emails'], message: 'presence' }]);

    // no context
    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
  }

  @test
  async "validate with many contexts"(assert: QUnitAssert) {
    let descriptors = dsl({
      emails: [
        validates('presence').on('publish', 'update')
      ]
    });

    let matchingContext = 'publish';
    assert.deepEqual(await this.validate(null, descriptors, matchingContext), [{ path: ['emails'], message: 'presence' }]);

    let anotherMatchingContext = 'update';
    assert.deepEqual(await this.validate(null, descriptors, anotherMatchingContext), [{ path: ['emails'], message: 'presence' }]);

    let notMatchingContext = 'create';
    assert.deepEqual(await this.validate(null, descriptors, notMatchingContext), []);

    // no context
    assert.deepEqual(await this.validate(null, descriptors), [{ path: ['emails'], message: 'presence' }]);
  }
}
