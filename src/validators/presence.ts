import { ValidationBuilder, validates } from '@validations/dsl';
import { unknown } from 'ts-std';
import { ValueValidator, factoryFor } from './value';

export interface PresenceErrorMessage {
  key: 'presence';
  args: null;
}

export class PresenceValidator extends ValueValidator<null, PresenceErrorMessage> {
  validate(value: unknown): PresenceErrorMessage | void {
    if (value === null || value === undefined) {
      return { key: 'presence' as 'presence', args: null };
    }
  }
}

export function presence(): ValidationBuilder {
  return validates(factoryFor(PresenceValidator), null);
}
