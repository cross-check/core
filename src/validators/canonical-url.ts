import { ValidationDescriptor } from '@validations/dsl';
import { NoArgs } from '../validator';
import { SingleFieldValidator, SingleFieldError } from './single-field';
import { Opaque } from '../utils';

export class CanonicalUrlValidator extends SingleFieldValidator<NoArgs> {
  protected normalized: ValidationDescriptor[];

  validate(value: Opaque, error: SingleFieldError): void {
    let contentSource: string = <string> this.get('contentSource') || '';

    let isExternalPartner: boolean =  contentSource === 'external_partner';
    let isLicensedPartner: boolean =  contentSource === 'licensed_partner';

    if (isExternalPartner || isLicensedPartner) {
      if (!value) {
        error.set('canonical-url');
      }
    }
  }
}
