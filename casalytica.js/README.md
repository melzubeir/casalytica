# Casalytica

[![casalytica api](https://img.shields.io/badge/casalytica-api-blueviolet)](https://www.casalytica.com/api/docs/)

<p align="center">
<img src="https://raw.githubusercontent.com/melzubeir/casalytica/master/app/static/images/casalytica.png" width="480" height="480" >
</p>

An SDK to interact with Casalytica APIs

---

**WARNING:** This is still a highly experimental proejct. Use at your own risk.

---

## Installation

```sh
yarn add casalytica
```

or

```sh
npm i --save casalytica
```

## Usage

See full usage in code docs: [documentation](https://github.com/melzubeir/casalytica#readme)

### Casalytica


#### Put an impression

```js
import { CasalyticaClient } from "Casalytica";

const casalytica = new CasalyticaClient(CASALYTICA_API_KEY=YOUR_TOKEN_KEY_STRING);

const impression = {
  "posts": [
    {
      "post_hash": "3151efdf499e5220241b48040fc9500970f4aaa6f512daa0b88be7b3f200c339",
    },
    {
      "post_hash": "14fafdebff6610c2b0c2cca2b5ec901949e1f98c5bccbb72450b01cfd3c35228",
    }
  ],
  "referer": "https://www.google.com/",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
};

casalytica.postImpression(impression).then((response) => {
  console.log(response);
}
).catch((error) => {
  console.log(error);
}
);
```

#### Get impressions/views of a post

```js
import { CasalyticaClient } from "Casalytica";

const casalytica = new CasalyticaClient(CASALYTICA_API_KEY=YOUR_TOKEN_KEY_STRING);

const response = casalytica.getImpressions("3151efdf499e5220241b48040fc9500970f4aaa6f512daa0b88be7b3f200c339"
  ).then  ((response) => {
    console.log(response);
  }
  ).catch((error) => {
    console.log(error);
  }
);

```

what you get back is a payload that includes:

{
  "post_hash": "",
  "impressions_total": 0,
  "likes_total": 0,
  "diamonds_total": 0,
  "comments_total": 0,
  "reposts_total": 0,
  "creator": 0,
  "node": 2147483647
}
