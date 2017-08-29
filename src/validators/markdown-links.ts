import {SingleFieldValidator, SingleFieldError } from "./single-field";
import {Opaque} from "../utils";
import {NoArgs} from "../validator";

let validMdLink: RegExp = /\[([^\[]+)\]\(([^\)]+)\)/g;

// unsure what an 'appleUrl' is. Seems like it is just a url pattern with some additional expectations
let appleUrl: RegExp = /(\()http(s)?:\/\/\.?[a-z0-9]+([\-\.]{1}[a-z0-9-]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?\)$/gm;
let specialMdCases = /(#video|#iframe|mailto)/g;

export class MarkdownLinksValidator extends SingleFieldValidator<NoArgs> {
  validate(value: Opaque, error: SingleFieldError): void {
    if (value === null || value === undefined || typeof value !== "string") return;

    let validMdLinks: string[] = value.match(validMdLink) || [];
    validMdLinks.forEach(function (item) {
      if (!appleUrl.test(item) && !specialMdCases.test(item)) {
        error.set('markdown-links');
      }
    });
  }
}


