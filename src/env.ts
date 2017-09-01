import { Opaque } from './utils';
import { ValidatorClass } from './validate';

export abstract class Environment {
  get<T>(object: Opaque, key: PropertyKey): T | undefined {
    if (typeof object === 'object' && object !== null) {
      return (object as any)[key] as T;
    }

    return;
  }

  abstract getValidator(name: string): ValidatorClass;
}
