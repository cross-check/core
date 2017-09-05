import { Dict, unknown } from 'ts-std';
import { QUnitAssert } from './interfaces';

// A bunch of this file was extracted from the Glimmer testing harness.
// TODO: Clean this up and eliminate anything that isn't generically unnecessary.

export type TestFunction = ((this: TestCase, assert: typeof QUnit.assert) => void) & { isTest: true };

function setTestingDescriptor(descriptor: PropertyDescriptor): void {
  let testFunction = descriptor.value as TestFunction;
  descriptor.enumerable = true;
  testFunction.isTest = true;
}

function isTestFunction(value: any): value is TestFunction {
  return typeof value === 'function' && value.isTest;
}

export function test(meta: Dict<unknown>): MethodDecorator;
export function test(
  _target: object,
  _name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void;
export function test(...args: any[]) {
  if (args.length === 1) {
    let meta: Dict<unknown> = args[0];
    return (_target: object, _name: string, propertyDescriptor: PropertyDescriptor) => {
      let testFunction = propertyDescriptor.value as TestFunction & Dict<unknown> ;
      Object.keys(meta).forEach(key => (testFunction[key] = meta[key]));
      setTestingDescriptor(propertyDescriptor);
    };
  }

  let descriptor = args[2];
  setTestingDescriptor(descriptor);
  return descriptor;
}

export interface Constructor<T = unknown, Prototype = T> {
  prototype: Prototype;
  new(...args: any[]): T;
}

export function module(
  name: string
): (klass: (typeof TestCase) & Constructor) => void {
  return (klass: typeof TestCase & Constructor) => {
    QUnit.module(name);

    let proto = klass.prototype as any as Dict<unknown>;
    for (let prop in proto) {
      const testFunction = proto[prop];

      if (isTestFunction(testFunction)) {
        QUnit.test(prop, assert => new klass().run(testFunction, assert));
      }
    }
  };
}

export abstract class TestCase {
  before() { /* noop */ }

  run(testFunction: TestFunction, assert: QUnitAssert): void | Promise<void> {
    this.before();
    return testFunction.call(this, assert);
  }
}
