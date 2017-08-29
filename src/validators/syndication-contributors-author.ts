import { ValidationDescriptor } from '@validations/dsl';
import { NoArgs } from '../validator';
import { SingleFieldValidator, SingleFieldError } from './single-field';
import { Opaque } from '../utils';

export class SyndicationContributorsAuthorValidator extends SingleFieldValidator<NoArgs> {
  protected normalized: ValidationDescriptor[];

  validate(value: Opaque, error: SingleFieldError): void {
    if (<boolean>this.get('syndicating')) {
      if (!value) {
        error.set('syndication-contributors-author');
      }
    }
  }
}
