# Casalytica

[![npm version](https://img.shields.io/badge/npm-casalytica-blueviolet)](https://www.casalytica.com/api/docs/)

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

const casalytica = new CasalyticaClient();

const impression = {
  "post_hash": "3151efdf499e5220241b48040fc9500970f4aaa6f512daa0b88be7b3f200c339",
  "source_app": 1,
  "remote_addr": "4.2.2.1",
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
