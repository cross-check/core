import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("inline all present validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "inline all present with keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      inline: validates('inline-all-present').keys('embeddedItems')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ inline: null }, descriptors), [], 'validate({ inline: null })');
    assert.deepEqual(await this.validate({ inline: 'some string' }, descriptors), [], 'validate({ inline: \'some string\' })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}], embeddedItems: [{id: 234}] }, descriptors), [], 'validate({ inline: [{id: 234}], embeddedItems: [{id: 234}] })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}], embeddedItems: [{id: 12}] }, descriptors), [{ path: ['inline'], message: 'inline-all-present' }], 'validate({ inline: [{id: 234}], embeddedItems: [{id: 12}] })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}, {id: 678}] }, descriptors), [], 'validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}, {id: 678}] })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}, {id: 111}], embeddedItems: [{id: 234}, {id: 678}] }, descriptors), [{ path: ['inline'], message: 'inline-all-present' }], 'validate({ inline: [{id: 234}, {id: 111}], embeddedItems: [{id: 234}, {id: 678}] })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}, {id: 111}] }, descriptors), [{ path: ['inline'], message: 'inline-all-present' }], 'validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}, {id: 111}] })');
    assert.deepEqual(await this.validate({ inline: null, embeddedItems: [{id: 234}, {id: 111}] }, descriptors), [], 'validate({ inline: null, embeddedItems: [{id: 234}, {id: 111}] })');
    assert.deepEqual(await this.validate({ embeddedItems: [{id: 234}] }, descriptors), [], 'validate({ embeddedItems: [{id: 234}] })');
    assert.deepEqual(await this.validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}] }, descriptors), [], 'validate({ inline: [{id: 234}, {id: 678}], embeddedItems: [{id: 234}] })');
}

  @test
  async "inline all present without keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      inline: validates('inline-all-present')
    });

    assert.deepEqual(await this.validate({ inline: null, embeddedItems: [{id: 234}, {id: 111}] }, descriptors), [], 'validate({ inline: null, embeddedItems: [{id: 234}, {id: 111}] })');
  }
}
