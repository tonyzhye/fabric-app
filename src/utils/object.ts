import { isNil, isEmpty } from 'ramda';

const intReg = new RegExp(/^\d+$/);

export const INVALID_INT_VALUE = -1;

// tslint:disable-next-line:no-any
export function isNilOrEmpty(value: any): boolean {
  return isNil(value) || isEmpty(value);
}

// tslint:disable-next-line:no-any
export function isInt(value: any): boolean {
  var str = value.toString();
  return intReg.test(str);
}

// tslint:disable-next-line:no-any
export function toInt(value: any): number {
  if (isInt(value)) {
    const str = value.toString();
    return +str;
  }
  return INVALID_INT_VALUE;
}
