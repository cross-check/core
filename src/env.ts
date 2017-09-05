import { unknown } from 'ts-std';
import { ValidatorClass } from './validate';

export abstract class Environment {
  get<T>(object: unknown, key: PropertyKey): T | undefined {
    if (typeof object === 'object' && object !== null) {
      return (object as any)[key] as T;
    }

    return;
  }

  abstract getValidator(name: string): ValidatorClass;
}
