# Denormalize

Utility to save your complex data structures during normalization

Currently works with:
- Options [tsoption](https://github.com/bcherny/tsoption)
- Dates

## How to use?

Imagine yourself trying to send `Dates` or `Options` to the server and receiving it back.
`denormalize` is aimed to help you with that by preparing your object to normalization and denormalization.

## Example

1. For example, you have `objectToNormalize` which you want to send to the server

```
import { Option } from "tsoption";


const objectToNormalize = {
  age: Option.of(42),
  expireAt: new Date()
};

```

`Option` during normalization is going to be converted to plain JS object with all metadata lost

2. To save our precious data we need to prepare our object and add our metadata

```
import { prenormalize } from 'denormalize';


const prenormalized = prenormalize(objectToNormalize)

```

After prenormalizing object'll look like that

```
{
  age: {
    value: 42,
    OPTION_MARK: true
  },
  expireAt: new Date()
};

```

3. Now it's time to send our object to the server

After serialization it'll look like that

```
const serialized =
  '{age:{value:42,OPTION_MARK:true},expireAt:"Wed Apr 10 2019 17:23:19 GMT+0300 (Moscow Standard Time)"}';

```

4. Later we need to receive it from the server and deserialize

After deserialization it'll look like that

```
const deserialized = {
  age: {
    value: 42,
    OPTION_MARK: true
  },
  expireAt: 'Wed Apr 10 2019 17:23:19 GMT+0300 (Moscow Standard Time)'
};
```

5. The final and the most important step: denormalization

Here we restore all precious metadata

```
import { denormalize } from 'denormalize';

const denoramlized = denormalize(deserialized)


const denormalized = {
  age: Option.of(42),
  expireAt: new Date()
};

```

## Real world examples

### Denormalizing data from the server

```

import { denormalize } from '@breadhead/denormalize'

export const fetchArticleRequest = (api: Api) => (
  id: number,
): Promise<ArticleModel> =>
  api.client
    .get('/articles')
    .then(response => denormalize(response.data) as ArticleModel[])
    .then(articles => articles.find(article => id === article.id))
    .then(article => {
      if (!article) {
        throw new Error(`Article with proided id (${id}) not found`)
      }

      return article
    })

```


### Prenormalizing data 

```

import { denormalize, prenormalize } from '@breadhead/denormalize'

export const getOrCreateStore = (initialState?: State) => {
  if (isServer) {
    prenormalize(initialState)
  }

  const state = denormalize(initialState)

  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(state)
  }

  // Create store if unavailable on the client and set it on the window object
  // prettier-ignore
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(state)
  }

  return (window as any)[__NEXT_REDUX_STORE__]
}


```