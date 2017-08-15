import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {Opaque} from "../utils";

export class FormatValidator extends SingleFieldValidator<[RegExp]> {
  validate(value: Opaque, error: SingleFieldError): void {
    if (typeof value === 'string') {
      if (!this.arg.test(value)) {
        error.set('format');
      }
    }
  }
}
