import { Option } from 'tsoption';
import mapValues from 'lodash.mapvalues';
import isObject from 'lodash.isobject';

import { OPTION_MARK } from './objectTaps/OPTION_MARK';

const isOption = (obj: any): boolean => obj instanceof Option;

const mapValuesDeep = (obj: any, callback: (value: any) => any): any =>
  isObject(obj) && !isOption(obj)
    ? mapValues(obj, (value: any) => mapValuesDeep(value, callback))
    : callback(obj);

export const prenormalize = (obj: any) =>
  mapValuesDeep(obj, (v: any) => {
    if (isOption(v)) {
      v[OPTION_MARK] = true;
    }

    return v;
  });
