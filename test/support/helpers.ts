import { ValidationBuilder } from '@validations/dsl';
import { format } from '@validations/runtime';

export function email(): ValidationBuilder {
  return format(/^(.+)@(.+){2,}\.(.+){2,}$/);
}
