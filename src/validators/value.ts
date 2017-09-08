import { Environment, ErrorMessage, ValidationError, ValidatorFactory } from '@validations/core';
import { Task } from 'no-show';
import { unknown } from 'ts-std';

export interface Validator<E extends ErrorMessage = ErrorMessage> {
  run(v: unknown): Task<Array<ValidationError<E>>>;
}

export type MaybeTask<T> = T | PromiseLike<T>;

export abstract class ValueValidator<Options, E extends ErrorMessage> implements Validator<E> {
  constructor(protected env: Environment, protected options: Options) {}

  abstract validate(value: unknown): MaybeTask<E | void>;

  run(v: unknown): Task<Array<ValidationError<E>>> {
    return new Task(async run => {
      let error = await run(this.validate(v));

      if (error) {
        return [{ path: [], message: error }];
      } else {
        return [];
      }
    });
  }
}

export interface ValidatorConstructor<Options, E extends ErrorMessage> {
  new(env: Environment, options: Options): Validator<E>;
}

export function factoryFor<Options, E extends ErrorMessage>(V: ValidatorConstructor<Options, E>): ValidatorFactory<Options, E> {
  return (env: Environment, options: Options) => {
    let validator = new V(env, options);
    return (v: unknown) => validator.run(v);
  };
}
