import { ValidationError } from '@validations/core';
import { ValidationBuilder, validates } from '@validations/dsl';
import { Task } from 'no-show';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export type DateOptions = undefined;

export interface DateErrorMessage {
  key: 'date';
  args: null;
}

export type DateError = ValidationError<DateErrorMessage>;

export class DateValidator extends ValueValidator<void, DateErrorMessage> {
  validate(v: unknown): Task<DateErrorMessage | void> {
    return new Task(async () => {
      if (typeof v !== 'string' && typeof v !== 'number') return;

      let dateValue = new Date(v);
      if (!(dateValue.getFullYear() >= 1900 && dateValue.getFullYear() <= 3000)) {
        return { key: 'date' as 'date', args: null };
      }

      return;
    });
  }
}

export function date(): ValidationBuilder {
  return validates(factoryFor(DateValidator), null);
}
