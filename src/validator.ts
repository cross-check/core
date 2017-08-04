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

export abstract class Validator<Args extends ReadonlyArray<Opaque> = ReadonlyArray<Opaque>> {
  constructor(
    protected env: Environment,
    private object: Opaque,
    protected descriptor: ValidationDescriptor
  ) {}

  protected get field(): string {
    return this.descriptor.field;
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
