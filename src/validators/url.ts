import { ValidationBuilderDSL, validates } from '@validations/dsl';
import { Nested } from '@validations/dsl/src/utils';

const absoluteUrlFormat = /^(https?:)?\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const relativeUrlFormat = /^(?!(https?:)?\/\/)[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const httpUrlFormat = /^http:\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const httpsUrlFormat = /^https:\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const protocolRelativeUrlFormat = /^\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;

export function url(option?: string): Nested<ValidationBuilderDSL> {
  let validators: ValidationBuilderDSL[] = [
    validates('string')
  ];

  if (option === 'absolute' || option === undefined) {
    validators.push(validates('format', absoluteUrlFormat));
  } else if (option === 'relative') {
    validators.push(validates('format', relativeUrlFormat));
  } else if (option === 'http') {
    validators.push(validates('format', httpUrlFormat));
  } else if (option === 'https') {
    validators.push(validates('format', httpsUrlFormat));
  } else if (option === 'protocol-relative') {
    validators.push(validates('format', protocolRelativeUrlFormat));
  }

  return validators;
}
