import { Opaque } from '../utils';
import { SingleFieldError, SingleFieldValidator } from './single-field';

export class FormatValidator extends SingleFieldValidator<[RegExp]> {
  validate(value: Opaque, error: SingleFieldError): void {
    if (typeof value === 'string') {
      if (!this.arg.test(value)) {
        error.set('format');
      }
    }
  }
}
