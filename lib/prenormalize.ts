import { Option } from 'tsoption'
import mapValues from 'lodash.mapvalues'
import isPlainObject from 'lodash.isplainobject'

import { OPTION_MARK } from './objectTaps/OPTION_MARK'

const isOption = (obj: any): boolean => obj instanceof Option

const mapValuesDeep = (obj: any, callback: (value: any) => any): any => {
  const result =
    isPlainObject(obj) && !isOption(obj)
      ? mapValues(obj, (value: any) => mapValuesDeep(value, callback))
      : callback(obj)

  return result
}

export const prenormalize = (obj: any) => {
  const result = mapValuesDeep(obj, (v: any) => {
    if (isOption(v)) {
      v[OPTION_MARK] = true
    }

    return v
  })
  return result
}
