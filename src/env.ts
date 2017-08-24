import { Opaque } from './utils';
import { ValidatorClass } from './validate';
import { ComposedValidator } from './compose';

export type Validator = ValidatorClass | ComposedValidator;

export function isValidatorClass(v: Validator): v is ValidatorClass {
  return typeof v === 'function';
}

export abstract class Environment {
  get<T>(object: Opaque, key: PropertyKey): T | undefined {
    if (typeof object === 'object' && object !== null) {
      return (object as any)[key] as T;
    }

    return;
  }

  abstract getValidator(name: string): Validator;
}
