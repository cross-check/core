import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {Opaque} from "../utils";
import {NoArgs} from "../validator";

type ConfigService = { config: { categories: { roots: [{ slug: string, minSelected: number }] } } };

export class CategoriesMinimumValidator extends SingleFieldValidator<NoArgs> {
  validate(value: Opaque, error: SingleFieldError): void {
    let configService: ConfigService = <ConfigService> this.get('configService');
    let featuresService: { enableCategoryPicker: boolean } = <{ enableCategoryPicker: boolean }> this.get('featuresService');
    if (!configService || !featuresService) return;

    let rootConfigs = configService.config.categories.roots || [];
    let categoriesEnabled: boolean = featuresService.enableCategoryPicker;

    // Validation is dependent on brandConfigs. If not present
    // no need to run the validation
    if (categoriesEnabled && rootConfigs) {
      if (!value) {
        error.set('categories-minimum');
        return;
      }

      let categories: {[key: string]: Array<Opaque>} = value;
      let categoryErrors: Array<string> = [];

      rootConfigs.forEach(rootConfig => {
        let rootVal = categories[rootConfig.slug] || [];
        if (rootConfig && rootConfig.minSelected > rootVal.length) {
          categoryErrors.push(rootConfig.slug);
        }
      });

      if (categoryErrors.length > 0) {
        let errs = '';
        if (categoryErrors.length === 1) {
          errs = categoryErrors[0];
        } else if (categoryErrors.length === 2) {
          errs = categoryErrors.join(' and ');
        } else if (categoryErrors.length > 2) {
          errs = categoryErrors.slice(0, -1).join(', ') + ', and ' + categoryErrors.slice(-1);
        }
        
        //TODO: do something about the custom error messages.

        error.set('categories-minimum');
      }
    }

  }
}


