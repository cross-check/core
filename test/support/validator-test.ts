import {
  Environment as AbstractEnvironment,
  Opaque,
  ValidatorClass,
  ValidationError,
  dict,
  validate as validateWithEnv,
  SingleFieldValidator,
  SingleFieldError,
  ObjectValidator,
  FieldsValidator,
  DateValidator,
  PresenceValidator,
  NumericValidator,
  StringValidator
} from '@validations/core';
import { Task } from 'no-show';
import { ValidationDescriptors } from '@validations/dsl';
import { TestCase } from './test-case';

export abstract class ValidationTest extends TestCase {
  protected env = new Environment();

  protected define(validator: ValidatorDecorator): void {
    basicValidators(validator);

    this.env.register('object', ObjectValidator);
    this.env.register('fields', FieldsValidator);
    this.env.register('date', DateValidator);
    this.env.register('presence', PresenceValidator);
    this.env.register('numeric', NumericValidator);
    this.env.register('string', StringValidator);
  }

  protected validate(object: Opaque, descs: ValidationDescriptors): Task<ValidationError[]> {
    return validateWithEnv(this.env, object, descs);
  }

  before() {
    this.define((name) => (constructor) => this.env.register(name, constructor));
  }
}

/**
 * Define the test environment:
 *
 * - get() has the default definition (JavaScript lookup)
 * - tests can register validator names with register()
 */

export class Environment extends AbstractEnvironment {
  private validators = dict<ValidatorClass>();

  register(name: string, constructor: ValidatorClass) {
    this.validators[name] = constructor;
  }

  getValidator(name: string): ValidatorClass {
    return this.validators[name];
  }
}

export interface ValidatorDecorator {
  (name: string): (constructor: ValidatorClass) => void;
}

// The `any` here and the return in the body of the function is working around a typescript
// limitation that prevents us from decorating a class expression.
//
// see https://github.com/Microsoft/TypeScript/issues/9448#issuecomment-320779210
function basicValidators(validator: ValidatorDecorator): any {
  @validator('range')
  class RangeValidator extends SingleFieldValidator<[{ min?: number, max?: number }]> {
    validate(value: Opaque, error: SingleFieldError): void {
      // non-numeric values should be handled by the numeric validator
      if (typeof value !== 'number') return;

      let options = this.arg;

      if (options.min && value < options.min) {
        error.set('range');
        return;
      }

      if (options.max && value > options.max) {
        error.set('range');
        return;
      }
    }
  }

@validator('format')
  class FormatValidator extends SingleFieldValidator<[RegExp]> {
    validate(value: Opaque, error: SingleFieldError): void {
      if (typeof value === 'string') {
        if (!this.arg.test(value)) {
          error.set('format');
        }
      }
    }
  }

  return { RangeValidator, FormatValidator };
}
