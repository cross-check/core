import { ValidationBuilder, validates } from '@validations/dsl';

const yearFormat = /^\d{4}$/;

export function year(): ValidationBuilder {
  return validates('string').and(validates('format', yearFormat));
}
