import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {NoArgs} from "../validator";
import {Opaque} from "../utils";

export class NumericValidator extends SingleFieldValidator<NoArgs> {
  validate(value: Opaque, error: SingleFieldError): void {
    // null and undefined should be handled by the presence validator
    if (value === null || value === undefined) return;

    if (typeof value !== 'number') {
      error.set('numeric');
    }
  }
}
