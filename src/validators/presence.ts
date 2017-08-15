import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {NoArgs} from "../validator";
import {Opaque} from "../utils";

export class PresenceValidator extends SingleFieldValidator<NoArgs> {
  validate(value: Opaque, error: SingleFieldError): void {
    if (value === null || value === undefined) {
      error.set('presence');
    }
  }
}
