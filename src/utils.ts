export type Option<T> = T | null;

export type Present = {} | void;
export type Opaque = Present | null | undefined;

export interface Dict<T = Opaque> {
  [key: string]: T;
}

export function dict<T = Opaque>(): Dict<T> {
  return Object.create(null);
}

class AssertionFailed extends Error {
  constructor(message?: string) {
    super(message ? `Assertion failed: ${message}` : 'Assertion failed.');
  }
}

/* TODO: use babel-plugin-debug-macros */
export function assert(cond: any, message?: string) {
  if (!cond) throw new AssertionFailed(message);
}
