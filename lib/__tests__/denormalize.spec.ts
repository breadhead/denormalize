import { denormalize } from '../denormalize'
import { Option } from 'tsoption'

describe('denormalize works', () => {
  test('should correctly denormalize values ', () => {
    expect(
      denormalize({
        id: 12,
        name: { value: 'jack', __OPTION_MARK__: true },
        date: '2018-12-19T14:00:01.677Z',
      }),
    ).toEqual({
      id: 12,
      name: Option.of('jack'),
      date: new Date('2018-12-19T14:00:01.677Z'),
    })
  })

  test('pass data as is if its simple object', () => {
    const data = {
      name: 'Igor',
    }

    expect(denormalize(data)).toEqual(data)
  })

  test('tap date data in flat object with one key', () => {
    const data = {
      createdAt: '2018-12-19T14:00:01.677Z',
    }

    expect(denormalize(data)).toEqual({
      createdAt: new Date('2018-12-19T14:00:01.677Z'),
    })
  })

  test('tap date data in flat object with many keys', () => {
    const data = {
      createdAt: '2018-12-19T14:00:01.677Z',
      updatedAt: '2018-01-19T14:00:01.677Z',
    }

    expect(denormalize(data)).toEqual({
      createdAt: new Date('2018-12-19T14:00:01.677Z'),
      updatedAt: new Date('2018-01-19T14:00:01.677Z'),
    })
  })

  test('pick lang data in deep object', () => {
    const data = {
      updatedAt: '2018-01-19T14:00:01.677Z',
      data: {
        createdAt: '2018-12-19T14:00:01.677Z',
      },
    }

    expect(denormalize(data)).toEqual({
      updatedAt: new Date('2018-01-19T14:00:01.677Z'),
      data: {
        createdAt: new Date('2018-12-19T14:00:01.677Z'),
      },
    })
  })

  test('pick lang data in object with normal keys', () => {
    const data = {
      createdAt: '2018-12-19T14:00:01.677Z',
      data: {
        description: 'simple string',
      },
    }

    expect(denormalize(data)).toEqual({
      createdAt: new Date('2018-12-19T14:00:01.677Z'),
      data: {
        description: 'simple string',
      },
    })
  })

  test('pick lang data in object with array', () => {
    const data = {
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    }

    expect(denormalize(data)).toEqual({
      slides: ['Lang insensitive 1', 'Lang insensitive 2'],
    })
  })

  test('remove inappropriate elements from arrays', () => {
    const data = {
      slides: [
        {
          name: 'Lang insensitive 1',
          createdAt: '2018-12-19T14:00:01.677Z',
        },
        {
          name: 'Lang insensitive 2',
          createdAt: '2018-01-19T14:00:01.677Z',
        },
      ],
    }

    expect(denormalize(data)).toEqual({
      slides: [
        {
          name: 'Lang insensitive 1',
          createdAt: new Date('2018-12-19T14:00:01.677Z'),
        },
        {
          name: 'Lang insensitive 2',
          createdAt: new Date('2018-01-19T14:00:01.677Z'),
        },
      ],
    })
  })
})
