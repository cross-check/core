import { ValidationDescriptor } from '@validations/core';
import { Runnable } from 'no-show';
import { unknown } from 'ts-std';

import { Environment } from './env';

export type Key = string;
export type Path = Key[];
export type Message = string;

export interface ValidationError {
  path: Path;
  message: Message;
}

export type NoArgs = ReadonlyArray<never>;

export abstract class Validator<Args extends ReadonlyArray<unknown> = ReadonlyArray<unknown>> {
  protected value: unknown;

  constructor(
    protected env: Environment,
    protected field: string,
    private object: unknown,
    protected descriptor: ValidationDescriptor
  ) {
    this.value = this.get(this.field);
    this.initialize();
  }

  abstract run(): Runnable<ValidationError[]>;

  // intentionally takes no parameters to aid subclassing
  protected initialize(): void { /* noop */ }

  protected get arg(): Args[0] {
    return this.args[0];
  }

  protected get args(): Args {
    return this.descriptor.validator.args as Args;
  }

  protected get(property: string): unknown {
    let { field, descriptor: { keys } } = this;

    if (property === field || (keys && keys.indexOf(property) !== -1)) {
      return this.env.get(this.object, property);
    }
  }
}
