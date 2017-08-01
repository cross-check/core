import { Opaque } from './utils';

export interface Getter {
  <T>(obj: Opaque, key: PropertyKey): T | undefined;
}

let getter: Getter = function defaultGetter<T>(obj: Opaque, key: PropertyKey): T | undefined {
  if (typeof obj === 'object' && obj !== null) {
    return (obj as any)[key] as T;
  }
};

export default function get<T>(obj: Opaque, key: PropertyKey): T | undefined {
  return getter(obj, key);
}

export function defineGetter(g: Getter) {
  getter = g;
}
