import { validates } from '@validations/dsl';
import { ComposedValidator, compose } from '../compose';

const emailFormat = /^([^\s]+)@([^\s]+){2,}\.([^\s]+){2,}$/;

export const email: ComposedValidator =
  compose(() => [
    validates('string'),
    validates('format', emailFormat)
  ]);
