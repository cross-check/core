import { ValidationBuilder, validates } from '@validations/dsl';

export const presence = validates('presence');
export const email = validates('format', /^(.+)@(.+){2,}\.(.+){2,}$/);
export const str = validates('string');

export function present(validator: ValidationBuilder): ValidationBuilder {
  return presence.and(validator);
}
