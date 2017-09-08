import { ValidationBuilder, validates } from '@validations/dsl';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export interface StringErrorMessage {
  key: 'string';
  args: null;
}

export class StringValidator extends ValueValidator<null, StringErrorMessage> {
  validate(value: unknown): StringErrorMessage | void {
    if (value === null || value === undefined) return;

    if (typeof value !== 'string') {
      return { key: 'string' as 'string', args: null };
    }
  }
}

export function string(): ValidationBuilder {
  return validates(factoryFor(StringValidator), null);
}
