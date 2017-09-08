import { ValidationBuilder, validates } from '@validations/dsl';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export interface FormatErrorMessage {
  key: 'format';
  args: null;
}

export class FormatValidator extends ValueValidator<RegExp, FormatErrorMessage> {
  validate(value: unknown): FormatErrorMessage | void {
    if (typeof value === 'string') {
      if (!this.options.test(value)) {
        return { key: 'format', args: null };
      }
    }
  }
}

export function format(regexp: RegExp): ValidationBuilder {
  return validates(factoryFor(FormatValidator), regexp);
}
