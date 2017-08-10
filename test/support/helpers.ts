import { MultiValidationDSL, ValidationBuilderDSL, multi, validates } from '@validations/dsl';

export const presence: MultiValidationDSL = multi().add(validates('presence'));
export const email: MultiValidationDSL = multi().add(validates('format', /^(.+)@(.+){2,}\.(.+){2,}$/));
export const string: MultiValidationDSL = multi().add(validates('string'));

export function present(validator: ValidationBuilderDSL): MultiValidationDSL {
  return presence.add(validator);
}
