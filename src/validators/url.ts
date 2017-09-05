import { ValidationBuilder, validates } from '@validations/dsl';

const absoluteUrlFormat = /^(https?:)?\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const relativeUrlFormat = /^(?!(https?:)?\/\/)[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const httpUrlFormat = /^http:\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const httpsUrlFormat = /^https:\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;
const protocolRelativeUrlFormat = /^\/\/[\w\d-_\/=?&.%:#\[\]@!\$'\(\)\*\+,]+$/;

export const enum UrlType {
  Absolute = 'absolute',
  Relative = 'relative',
  Http = 'http',
  Https = 'https',
  ProtocolRelative = 'protocol-relative'
}

export function url(option: UrlType = UrlType.Absolute): ValidationBuilder {
  let format: RegExp;

  switch (option) {
    case UrlType.Absolute: format = absoluteUrlFormat; break;
    case UrlType.Relative: format = relativeUrlFormat; break;
    case UrlType.Http:     format = httpUrlFormat; break;
    case UrlType.Https:    format = httpsUrlFormat; break;
    case UrlType.ProtocolRelative: format = protocolRelativeUrlFormat; break;
    default: throw new Error('unreachable');
  }

  return validates('string').and(validates('format', format));
}
