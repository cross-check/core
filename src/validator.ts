import { ValidationDescriptor, ValidationDescriptors } from '@validations/dsl';
import Task, { Runnable } from 'no-show';

import get from './get';
import { Opaque, Option, Present, assert } from "./utils";

export type Key = string;
export type Path = Key[];
export type Message = string;

export interface ValidationError {
  path: Path;
  message: Message;
}

export abstract class Validator {
  constructor(
    private object: Opaque,
    protected descriptor: ValidationDescriptor
  ) {}

  protected get(property: string): Opaque {
    let { descriptor: { field, keys } } = this;

    if (property === field || (keys && keys.includes(property))) {
      return get(this.object, property);
    }
  }

  abstract run(): Runnable<ValidationError[]>;
}
