import { ValidationBuilder, validates } from '@validations/dsl';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export interface RangeErrorMessage {
  key: 'range';
  args: RangeOptions;
}

export interface RangeOptions {
  min?: number;
  max?: number;
}

export class RangeValidator extends ValueValidator<RangeOptions, RangeErrorMessage> {
  validate(value: unknown): RangeErrorMessage | void {
    // non-numeric values should be handled by the numeric validator
    if (typeof value !== 'number') return;

    let options = this.options;

    if (options.min !== undefined && value < options.min) {
      return { key: 'range' as 'range', args: options };
    }

    if (options.max !== undefined && value > options.max) {
      return { key: 'range' as 'range', args: options };
    }
  }
}

export function range(options: RangeOptions): ValidationBuilder {
  return validates(factoryFor(RangeValidator), options);
}
