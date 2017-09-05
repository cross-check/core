import { unknown } from 'ts-std';
import { NoArgs } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class PresenceValidator extends SingleFieldValidator<NoArgs> {
  validate(value: unknown, error: SingleFieldError): void {
    if (value === null || value === undefined) {
      error.set('presence');
    }
  }
}
