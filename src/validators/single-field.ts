import { Runnable, Task } from 'no-show';
import { Option, assert, unknown } from 'ts-std';
import { Key, Message, ValidationError, Validator } from '../validator';

export class SingleFieldError {
  private error: Option<Message> = null;

  constructor(private field: Key) {}

  set(error: Message): void {
    assert(this.error === null, 'Cannot `set` error twice');
    this.error = error;
  }

  /** @internal */
  build(): ValidationError[] {
    if (this.error) {
      return [{ path: [this.field], message: this.error }];
    } else {
      return [];
    }
  }
}

export abstract class SingleFieldValidator<Args extends ReadonlyArray<unknown>> extends Validator<Args> {
  abstract validate(value: unknown, error: SingleFieldError): Runnable<void>;

  run(): Task<ValidationError[]> {
    let { field } = this;

    return new Task(async run => {
      let error = new SingleFieldError(field);

      // TODO: Link correctly
      await run(this.validate(this.value, error));

      return error.build();
    });
  }

  protected getSubProperty(key: string): unknown {
    return this.env.get(this.value, key);
  }
}
