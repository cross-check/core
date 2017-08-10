import { ValidationDescriptors, ValidationDescriptor } from '@validations/dsl';
import { Task } from 'no-show';
import { Validator, ValidationError } from './validator';
import { Opaque, Dict } from './utils';
import { Environment } from './env';

export function validate(env: Environment, object: Opaque, descriptors: ValidationDescriptors): Task<ValidationError[]> {
  if (object === 'wycats@example.com') debugger;
  return validateFlattened(env, object, flattenDict(descriptors));
}

export function validateFlattened(env: Environment, object: Opaque, descriptors: Iterable<ValidationDescriptor>): Task<ValidationError[]> {
  return new Task(async run => {
    let errors: ValidationError[] = [];

    for (let descriptor of descriptors) {
      let validator = buildValidator(env, object, descriptor);
      errors.push(...await run(validator.run()));
    }

    return errors;
  })
}

export interface ValidatorClass {
  new(env: Environment, object: Opaque, descriptor: ValidationDescriptor): Validator;
}

function buildValidator(env: Environment, object: Opaque, descriptor: ValidationDescriptor): Validator {
  if (!descriptor.validator) debugger;
  let name = descriptor.validator.name;
  let constructor = env.getValidator(name);

  return new constructor(env, object, descriptor);
}

export function flattenDict(descriptors: ValidationDescriptors): ValidationDescriptor[] {
  let flattened: ValidationDescriptor[] = [];

  for (let descs of values<ValidationDescriptor[]>(descriptors)) {
    flattened.push(...descs);
  }

  return flattened;
}

function *values<T>(object: Dict<T>): Iterable<T> {
  for (let prop in object) {
    yield object[prop];
  }
}
