export interface ObjectTaper {
  supports(object: any): boolean
  tap(object: any): any
}
