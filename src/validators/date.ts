import { unknown } from 'ts-std';
import { NoArgs } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class DateValidator extends SingleFieldValidator<NoArgs> {
  validate(value: unknown, error: SingleFieldError): void {
    // ignore everything except string and number.
    if (typeof value !== 'string' && typeof value !== 'number') return;

    let date = new Date(value);
    if (!(date.getFullYear() >= 1900 && date.getFullYear() <= 3000)) {
      error.set('date');
    }
  }
}
