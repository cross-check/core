import { ValidationDescriptors, ValidationError } from '@validations/core';
import {
  Environment as AbstractEnvironment,
  ValidatorClass,
  validate as validateWithEnv
} from '@validations/runtime';
import { Task } from 'no-show';
import { dict, expect, unknown } from 'ts-std';
import { TestCase } from './test-case';

export abstract class ValidationTest extends TestCase {
  protected env = new Environment();

  protected validate(object: unknown, descs: ValidationDescriptors): Task<ValidationError[]> {
    return validateWithEnv(this.env, object, descs);
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
    return expect(this.validators[name], `unexpected missing validator '${name}'`);
  }
}

export type ValidatorDecorator = (name: string) => (constructor: ValidatorClass) => void;
