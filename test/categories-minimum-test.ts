import dsl, { validates } from '@validations/dsl';
import { ValidationTest, QUnitAssert, module, test } from './support';

@module("categories minimum validators")
export class ValidatorTest extends ValidationTest {
  @test
  async "categories with keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      categories: validates('categories-minimum').keys('configService', 'featuresService')
    });

    assert.deepEqual(await this.validate(null, descriptors), [], 'validate(null)');
    assert.deepEqual(await this.validate({ categories: null }, descriptors), [], 'validate({ categories: null })');
    assert.deepEqual(await this.validate({ categories: {} }, descriptors), [], 'validate({ categories: \'some string\' })');
    assert.deepEqual(await this.validate({ categories: { news: [{ id: 123 }] }, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } } , descriptors), [{ path: ['categories'], message: 'categories-minimum' }], 'validate({ categories: { news: [{ id: 123 }] }, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 2 }]  } }, featuresService: { enableCategoryPicker: true } } })');
    assert.deepEqual(await this.validate({ categories: { news: [{ id: 123 }] }, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 1 }] } } }, featuresService: { enableCategoryPicker: true } } , descriptors), [], 'validate({ categories: { news: [{ id: 123 }] }, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 1 }] } }, featuresService: { enableCategoryPicker: true } } })');
    assert.deepEqual(await this.validate({ categories: null, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 1 }] } } }, featuresService: { enableCategoryPicker: true } }, descriptors), [{ path: ['categories'], message: 'categories-minimum' }], 'validate({ categories: null, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 1 }] } } }, featuresService: { enableCategoryPicker: true } })');
    assert.deepEqual(await this.validate({ categories: null, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 1 }, { slug: 'beauty', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } }, descriptors), [{ path: ['categories'], message: 'categories-minimum' }], 'validate({ categories: null, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 1 }, { slug: \'beauty\', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } })');
    assert.deepEqual(await this.validate({ categories: { news: [{ id: 123 }], beauty: [{ id: 234 }, { id: 454 }, { id: 9393 }] }, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 1 }, { slug: 'beauty', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } }, descriptors), [], 'validate({ categories: { news: [{ id: 123 }], beauty: [{ id: 234 }, { id: 454 }, { id: 9393 }] }, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 1 }, { slug: \'beauty\', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } })');
    assert.deepEqual(await this.validate({ categories: { news: [{ id: 123 }], beauty: [{id: 9393}]}, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 1 }, { slug: 'beauty', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: true } }, descriptors), [{ path: ['categories'], message: 'categories-minimum' }], 'validate({ categories: null, configService: {config: {categories:{roots: {news: 1}}}}, featuresService: { enableCategoryPicker: true } })');
    assert.deepEqual(await this.validate({ categories: { id: 234 }, configService: { config: { categories: { roots: [{ slug: 'news', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: false } }, descriptors), [], 'validate({ categories: { id: 234 }, configService: { config: { categories: { roots: [{ slug: \'news\', minSelected: 2 }] } } }, featuresService: { enableCategoryPicker: false } })');
    assert.deepEqual(await this.validate({ categories: 234 }, descriptors), [], 'validate({ categories: 234 })');
  }

  @test
  async "categories all present without keys"(assert: QUnitAssert) {
    let descriptors = dsl({
      categories: validates('categories-minimum')
    });

    assert.deepEqual(await this.validate({ categories: null, configService: { config: { categories: { roots: [{slug: 'news', minSelected: 1}]  } } }, featuresService: { enableCategoryPicker: true } }, descriptors), [], 'validate({ categories: null, configService: {config: {categories:{roots: {}}}} })');
  }
}
