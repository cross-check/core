import { unknown } from 'ts-std';
import { NoArgs } from '../validator';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class NumericValidator extends SingleFieldValidator<NoArgs> {
  validate(value: unknown, error: SingleFieldError): void {
    // null and undefined should be handled by the presence validator
    if (value === null || value === undefined) return;

    if (typeof value !== 'number') {
      error.set('numeric');
    }
  }
}
