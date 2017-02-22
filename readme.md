<a href="http://promisesaplus.com/">
    <img src="http://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo"
         title="Promises/A+ 1.1 compliant" align="right" />
</a>
# Express Native Promise Router
## Motivation
Allows you to use async functions or return Promises in your route handlers.

This library wraps the express.Router and allows you to use its complete API.

### Features
 - Native promises
 - Express standard API
 - extend-ible class
 - Lightweiget (0.7KB)

### Installation

```Bash
 $ npm install --save express-native-promise-router
```

*or even better with yarn:*
```Bash
 $ yarn add express-native-promise-router
```

### Usage

```JavaScript
const express = require('express');
const PromiseRouter = require('express-native-promise-router');

const app = express();
const router = new PromiseRouter();

app.use(router);

router.get('/', (req, res) => {
  return Promise.resolve('demo');
});

app.use((req, res) => {
  res.end(res.locals.resolved);
});

```
Resolved state is being passed through `res.locals.resolved` because in most cases you'd like to wrap state and errors in your app's responses.

#### With async/await

```JavaScript
const express = require('express');
const PromiseRouter = require('express-native-promise-router');

const app = express();
const router = new PromiseRouter();

app.use(router);

router.get('/', async (req, res) => {
  return await Promise.resolve('demo');
});

app.use((req, res) => {
  res.end(res.locals.resolved);
});
```

### Comparison

##### Handling errors  
By returning a promise rejections are automatically passed to next().

```JavaScript
const router = new PromiseRouter();

app.use(router);

router.get('/users', (req, res) => {
  return db.collection('users').find({}).toArray();
});

app.use((error, req, res, next) => {
  res.status(500).json({ error });
});

app.use((req, res) => {
  res.json({ data: res.locals.resolved });
});

```
##### Using co
```JavaScript
app.get('/users', (req, res, next) => co(function* () {
  res.locals.resolved = yield db.collection('users').find({}).toArray();
}).catch(next));

app.use((error, req, res, next) => {
  res.status(500).json({ error });
});

app.use((req, res) => {
  res.json({ data: res.locals.resolved });
});
```
