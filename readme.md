# Express Native Promise Router
## Promise compatible Express Router

### Features
 - Native promises
 - Express standard API
 - extend-ible class
 - Lightweiget (0.7KB)

### Installation

```Bash
 $ npm install --save express-native-promise-router
```
*yarn would be even better*

### Usage

```JavaScript
const express = require('express');
const PromiseRouter = require('express-native-promise-router');

const app = express();
const router = new PromiseRouter();

router.get('/', (req, res) => {
  return Promise.resolve('demo');
});

app.use((req, res, next) => {
  res.end(res.locals.resolved);
});

app.use(router);
```