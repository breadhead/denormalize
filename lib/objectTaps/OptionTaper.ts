import { Option } from 'tsoption'

import { ObjectTaper } from './ObjectTaper'
import { OPTION_MARK } from './OPTION_MARK'

export class OptionTaper implements ObjectTaper {
  public supports(object: any): boolean {
    return !!object[OPTION_MARK]
  }

  public tap(object: any) {
    return Option.of(object.value)
  }
}
