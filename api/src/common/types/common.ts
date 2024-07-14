export type ID = string;

// eslint-disable-next-line
export interface Type<T> extends Function {
  new (...args: any[]): T;
}
