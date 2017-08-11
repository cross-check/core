import {
  Environment as AbstractEnvironment,
  Opaque,
  ValidatorClass,
  ValidationError,
  dict,
  validate as validateWithEnv,
  SingleFieldValidator,
  SingleFieldError,
  NoArgs,
  ObjectValidator,
  FieldsValidator
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
  @validator('presence')
  class PresenceValidator extends SingleFieldValidator<NoArgs> {
    validate(value: Opaque, error: SingleFieldError): void {
      if (value === null || value === undefined) {
        error.set('presence');
      }
    }
  }

  @validator('numeric')
  class NumericValidator extends SingleFieldValidator<NoArgs> {
    validate(value: Opaque, error: SingleFieldError): void {
      // null and undefined should be handled by the presence validator
      if (value === null || value === undefined) return;

      if (typeof value !== 'number') {
        error.set('numeric');
      }
    }
  }

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

  return { PresenceValidator, NumericValidator, RangeValidator };
}
