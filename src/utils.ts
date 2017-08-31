export type Option<T> = T | null;
export type Maybe<T> = T | undefined;

export type Present = {} | void;
export type Opaque = Present | null | undefined;

export interface Dict<T = Opaque> {
  [key: string]: Maybe<T>;
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

export function expect<T>(value: Maybe<Option<T>>, message: string): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }

  return value;
}

export type Nested<T> = T | NestedArray<T>;
export interface NestedArray<T> extends Array<Nested<T>> {}

export function *flatten<T>(nested: Nested<T>): Iterable<T> {
  if (Array.isArray(nested)) {
    for (let item of nested) {
      yield *flatten(item);
    }
  } else {
    yield nested;
  }
}
