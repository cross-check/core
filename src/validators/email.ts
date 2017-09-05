import { ValidationBuilder, validates } from '@validations/dsl';

const emailFormat = /^([^\s]+)@([^\s]+){2,}\.([^\s]+){2,}$/;

export function email(): ValidationBuilder {
  return validates('string').and(validates('format', emailFormat));
}
