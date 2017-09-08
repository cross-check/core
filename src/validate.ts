import { Environment, ValidationDescriptor, ValidationDescriptors, ValidationError, Validator } from '@validations/core';
import { Task } from 'no-show';
import { unknown } from 'ts-std';

export function validate(env: Environment, value: unknown, descriptors: ValidationDescriptors): Task<ValidationError[]> {
  return new Task(async run => {
    let errors: ValidationError[] = [];

    for (let descriptor of descriptors) {
      let { factory, options } = descriptor;
      let validator = factory(env, options);

      errors.push(...await run(validator(value)));
    }

    return errors;
  });
}

export interface ValidatorClass {
  new(env: Environment, key: string, object: unknown, descriptor: ValidationDescriptor): Validator;
}
