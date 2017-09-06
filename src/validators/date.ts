import { ValidationError, Validator } from '@validations/core';
import { Task } from 'no-show';
import { unknown } from 'ts-std';

export type DateOptions = undefined;

export interface DateErrorMessage {
  key: 'date';
  args: null;
}

export type DateError = ValidationError<DateErrorMessage>;

export function date(): Validator<DateErrorMessage> {
  return (value: unknown): Task<DateError[]> => {
    return new Task(async () => {
      if (typeof value !== 'string' && typeof value !== 'number') return [];

      let dateValue = new Date(value);
      if (!(dateValue.getFullYear() >= 1900 && dateValue.getFullYear() <= 3000)) {
        return [{ path: [], message: { key: 'date' as 'date', args: null }}];
      } else {
        return [];
      }
    });
  };
}
