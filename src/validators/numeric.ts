import { ValidationBuilder, validates } from '@validations/dsl';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export interface NumberErrorMessage {
  key: 'number';
  args: null;
}

export class NumberValidator extends ValueValidator<null, NumberErrorMessage> {
  validate(value: unknown): NumberErrorMessage | void {
    if (value === null || value === undefined) return;

    if (typeof value !== 'number') {
      return { key: 'number' as 'number', args: null };
    }
  }
}

export function number(): ValidationBuilder {
  return validates(factoryFor(NumberValidator), null);
}
