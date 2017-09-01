import { MultiValidationDSL, multi, validates } from '@validations/dsl';

const emailFormat = /^([^\s]+)@([^\s]+){2,}\.([^\s]+){2,}$/;

export function email(): MultiValidationDSL {
  return multi().add(validates('string')).add(validates('format', emailFormat));
}
