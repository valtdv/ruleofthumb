# Test Frontend role - Rule of thumb

This project consists in the implementation of Rule of thumb designs and missing features

## Technologies

- Typescript
- Vue.js
- Vitest
- Vue test utils
- Pinia
- Json server

## Project Setup

### Clone repository in your terminal

```sh
git clone git@github.com:valtdv/ruleofthumb.git
```

### Install dependencies

```sh
npm install
```

### Run the API server in one tab

```sh
npm run server
```

### Run dev server in another tab

```sh
npm run dev
```

### Run Unit Tests

```sh
npm run test:unit
```
## API

### GET ```/data```

Example response

```sh
[
    {
      "id": "1",
      "name": "Kanye West",
      "description": "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
      "category": "entertainment",
      "picture": "kanye.png",
      "lastUpdated": "2020-03-10T23:08:57.892Z",
      "votes": {
        "positive": 24,
        "negative": 36
      }
    }
]
```

### PATCH ```/data/:id```

Example request url

```sh
${API_URL}/data/1
```

Example request body

```sh
{
    votes: {
        positive: 24,
        negative: 36
    }
}
```

Example respone

```sh
{
      id: '1'
      name: 'Kanye West',
      description:
        'Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.',
      category: 'entertainment',
      picture: 'kanye.png',
      lastUpdated: '2020-03-10T23:08:57.892Z',
      votes: {
        positive: 23,
        negative: 36
      }
}
```
