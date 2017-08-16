import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {Opaque} from "../utils";

export class RangeValidator extends SingleFieldValidator<[{ min?: number, max?: number }]> {
  validate(value: Opaque, error: SingleFieldError): void {
    // non-numeric values should be handled by the numeric validator
    if (typeof value !== 'number') return;

    let options = this.arg;

    if (options.min !== undefined && value < options.min) {
      error.set('range');
      return;
    }

    if (options.max !== undefined && value > options.max) {
      error.set('range');
      return;
    }
  }
}
