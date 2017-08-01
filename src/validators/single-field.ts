import { Option, assert, Opaque } from '../utils';
import { Message, Key, ValidationError, Validator } from '../validator';
import { Runnable, Task } from 'no-show';

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

export abstract class SingleFieldValidator extends Validator {
  abstract validate(value: Opaque, error: SingleFieldError): Runnable<void>;

  run(): Task<ValidationError[]> {
    let { descriptor: { field } } = this;

    return new Task(async run => {
      let error = new SingleFieldError(field);

      // TODO: Link correctly
      await run(this.validate(this.get(field), error));

      return error.build();
    });
  }
}
