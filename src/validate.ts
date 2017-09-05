import { FieldValidationDescriptors, ValidationDescriptor, ValidationDescriptors } from '@validations/core';
import { Task } from 'no-show';
import { entries, unknown } from 'ts-std';
import { Environment } from './env';
import { ValidationError, Validator } from './validator';

export function validate(env: Environment, object: unknown, descriptors: FieldValidationDescriptors): Task<ValidationError[]> {
  return new Task(async run => {
    let errors: ValidationError[] = [];

    for (let [key, descs] of entries<ValidationDescriptors>(descriptors)) {
      for (let descriptor of descs) {
        let validator = buildValidator(env, key, object, descriptor);
        errors.push(...await run(validator.run()));
      }
    }

    return errors;
  });

}

export interface ValidatorClass {
  new(env: Environment, key: string, object: unknown, descriptor: ValidationDescriptor): Validator;
}

function buildValidator(env: Environment, key: string, object: unknown, descriptor: ValidationDescriptor): Validator {
  let name = descriptor.validator.name;
  let constructor = env.getValidator(name);

  return new constructor(env, key, object, descriptor);
}
