import isPlainObject from 'lodash.isplainobject'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'
import flow from 'lodash.flow'
import isUndefined from 'lodash.isundefined'
import mapValues from 'lodash.mapvalues'

import { ObjectTaper } from './objectTaps/ObjectTaper'
import { OptionTaper } from './objectTaps/OptionTaper'
import { tapDate } from './stringTaps/tapDate'

const STRING_TAPS = [tapDate]
const OBJECT_TAPERS: ObjectTaper[] = [new OptionTaper()]

export const denormalize = (data: any): any => {
  if (isArray(data)) {
    return data.map(denormalize)
  }

  if (isString(data)) {
    return flow(STRING_TAPS)(data)
  }

  if (isUndefined(data) || !isPlainObject(data)) {
    return data
  }

  const supportedTapers = OBJECT_TAPERS.filter(taper => taper.supports(data))

  if (isPlainObject(data) && supportedTapers.length > 0) {
    return flow(supportedTapers.map(taper => (v: any) => taper.tap(v)))(data)
  }

  return mapValues(data, value => denormalize(value))
}
