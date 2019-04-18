import { prenormalize } from '../prenormalize'
import { Option } from 'tsoption'

describe('prenormalize works', () => {
  const name = Option.of('jack')
  const date = new Date('2018-12-19T14:00:01.677Z')
  const { date: newDate, name: newName } = prenormalize({ id: 12, name, date })

  test('should correctly process dates', () => {
    expect(newDate.toISOString()).toBe('2018-12-19T14:00:01.677Z')
  })
  test('should correctly process options', () => {
    expect(newName instanceof Option).toBe(true)
    expect(newName.get()).toBe('jack')
    expect(newName.__OPTION_MARK__).toBe(true)
  })
})
