import { ValidationDescriptors } from '@validations/dsl';
import {
  ArrayValidator,
  DateValidator,
  Environment as AbstractEnvironment,
  FieldsValidator,
  FormatValidator,
  MembersValidator,
  NumericValidator,
  ObjectValidator,
  Opaque,
  PresenceValidator,
  RangeValidator,
  StringValidator,
  ValidationError,
  ValidatorClass,
  dict,
  expect,
  validate as validateWithEnv
} from '@validations/runtime';
import { Task } from 'no-show';
import { TestCase } from './test-case';

export abstract class ValidationTest extends TestCase {
  protected env = new Environment();

  before(): void {
    this.define();
  }

  protected define(): void {
    this.env.register('array', ArrayValidator);
    this.env.register('date', DateValidator);
    this.env.register('fields', FieldsValidator);
    this.env.register('format', FormatValidator);
    this.env.register('members', MembersValidator);
    this.env.register('numeric', NumericValidator);
    this.env.register('object', ObjectValidator);
    this.env.register('presence', PresenceValidator);
    this.env.register('range', RangeValidator);
    this.env.register('string', StringValidator);
  }

  protected validate(object: Opaque, descs: ValidationDescriptors): Task<ValidationError[]> {
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
