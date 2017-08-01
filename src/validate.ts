import { ValidationDescriptors, ValidationDescriptor } from '@validations/dsl';
import { Task } from 'no-show';
import { Validator, ValidationError } from './validator';
import { Opaque, assert, Dict, dict } from './utils';

export function validate(object: Opaque, descriptors: ValidationDescriptors): Task<ValidationError[]> {
  return new Task(async run => {
    let errors: ValidationError[] = [];

    for (let descriptor of flatten(descriptors)) {
      let validator = buildValidator(object, descriptor);
      errors.push(...await run(validator.run()));
    }

    return errors;
  })
}

export function validateSync(object: Opaque, descriptors: ValidationDescriptors): ValidationError[] {
  let errors: ValidationError[] = [];

  for (let descriptor of flatten(descriptors)) {
    let validator = buildValidator(object, descriptor);
    let errors = validator.run();

    if (Array.isArray(errors)) {
      errors.push(...errors);
    } else {
      assert(false, `${validator.constructor.name} is not synchronous`);
    }
  }

  return errors;
}

export interface ValidatorClass {
  new(object: Opaque, descriptor: ValidationDescriptor): Validator;
}

let registry = dict<ValidatorClass>();

export function register(key: string, validator: ValidatorClass) {
  registry[key] = validator;
}

export function reset() {
  registry = dict();
}

function buildValidator(object: Opaque, descriptor: ValidationDescriptor): Validator {
  let name = descriptor.validator.name;
  let constructor = registry[name];

  return new constructor(object, descriptor);
}

function flatten(descriptors: ValidationDescriptors): ValidationDescriptor[] {
  let flattened: ValidationDescriptor[] = [];

  for (let descs of values(descriptors)) {
    flattened.push(...descs);
  }

  return flattened;
}

function *values<T>(object: Dict<T>): Iterable<T> {
  for (let prop in object) {
    yield object[prop];
  }
}
