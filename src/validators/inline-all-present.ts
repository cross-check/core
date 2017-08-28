import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {Opaque} from "../utils";
import {NoArgs} from "../validator";

export class InlineAllPresentValidator extends SingleFieldValidator<NoArgs> {
  validate(value: Opaque, error: SingleFieldError): void {
    if (!Array.isArray(value)) return;

    let embeddedItems: Array<{id: Opaque}> = <Array<{id: Opaque}>> this.get('embeddedItems') || [];

    embeddedItems.forEach(function (item) {
      let itemInInline: boolean = !!value.find((inline: {id: Opaque}) => {
        return inline.id === item.id
      });

      if (!itemInInline) {
        error.set('inline-all-present');
        return;
      }
    });

  }
}


