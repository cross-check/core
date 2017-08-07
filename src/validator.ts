import { ValidationDescriptor } from '@validations/dsl';
import { Runnable } from 'no-show';

import { Opaque } from "./utils";
import { Environment } from './env';

export type Key = string;
export type Path = Key[];
export type Message = string;

export interface ValidationError {
  path: Path;
  message: Message;
}

export type NoArgs = ReadonlyArray<never>;

export abstract class Validator<Args extends ReadonlyArray<Opaque> = ReadonlyArray<Opaque>> {
  protected value: Opaque;

  constructor(
    protected env: Environment,
    private object: Opaque,
    protected descriptor: ValidationDescriptor
  ) {
    this.value = this.get(this.field);
    this.initialize();
  }

  // intentionally takes no parameters to aid subclassing
  protected initialize(): void {}

  protected get field(): string {
    return this.descriptor.field;
  }

  protected get arg(): Args[0] {
    return this.args[0];
  }

  protected get args(): Args {
    return this.descriptor.validator.args as Args;
  }

  protected get(property: string): Opaque {
    let { descriptor: { field, keys } } = this;

    if (property === field || (keys && keys.includes(property))) {
      return this.env.get(this.object, property);
    }
  }

  abstract run(): Runnable<ValidationError[]>;
}
