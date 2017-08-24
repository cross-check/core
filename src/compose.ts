import { Opaque, Nested } from './utils';
import { ValidationBuilderDSL, ValidationDescriptor } from '@validations/dsl';

export interface ComposedValidator {
  build(desc: ValidationDescriptor): Nested<ValidationBuilderDSL>;
}

export type Inner = (...args: Opaque[]) => Nested<ValidationBuilderDSL>;

export class ComposedValidator {
  constructor(private inner: Inner) {}

  build(args: Opaque[]): Nested<ValidationBuilderDSL> {
    let inner = this.inner;
    return inner(...args);
  }
}

export function compose(callback: Inner): ComposedValidator {
  return new ComposedValidator(callback);
}
