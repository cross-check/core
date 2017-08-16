import { ValidationDescriptor } from '@validations/dsl';
import { Runnable } from 'no-show';

import { Opaque, Maybe } from "./utils";
import { Environment } from './env';

export type Key = string;
export type Path = Key[];
export type Message = string;

export interface ValidationError {
  path: Path;
  message: Message;
}

export type NoArgs = ReadonlyArray<never>;

/**
 * Determines if a context was provided during validation and whether the descriptor should run given the context.
 */
function validationShouldRun(descriptor: ValidationDescriptor, providedContext: Maybe<string>): boolean {
  return !providedContext || descriptor.contexts.length === 0 || descriptor.contexts.includes(providedContext);
}

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

  runWithContext(providedContext: Maybe<string>): Runnable<ValidationError[]> {
    if(providedContext) {
      console.log(this.descriptor, providedContext);
    }
    if (!validationShouldRun(this.descriptor, providedContext)) {
      return [];
    }

    return this.run();
  }

  abstract run(): Runnable<ValidationError[]>;
}
