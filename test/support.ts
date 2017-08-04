import { Environment as AbstractEnvironment, Opaque, ValidatorClass, ValidationError, dict, validate as validateWithEnv } from '@validations/core';
import { Task } from 'no-show';
import { ValidationDescriptors } from '@validations/dsl';

let env: Environment;

export function moduleForValidations(desc: string) {
  QUnit.module(desc, {
    before() {
      env = new Environment();
    }
  })
}

/**
 * Define the test environment:
 *
 * - get() has the default definition (JavaScript lookup)
 * - tests can register validator names with register()
 */

class Environment extends AbstractEnvironment {
  private validators = dict<ValidatorClass>();

  register(name: string, constructor: ValidatorClass) {
    this.validators[name] = constructor;
  }

  getValidator(name: string): ValidatorClass {
    return this.validators[name];
  }
}

/**
 * A function to validate an object with a series of validation descriptors.
 *
 * It uses the test environment.
 *
 * @param object the object to validate
 * @param desc
 */
export function validate(object: Opaque, desc: ValidationDescriptors): Task<ValidationError[]> {
  return validateWithEnv(env, object, desc);
}

/**
 * A decorator that registers a class with the test environment.
 *
 * @param name the name of the validator (used in validates())
 */
export function validator(name: string) {
  return function(constructor: ValidatorClass) {
    env.register(name, constructor);
  }
}
