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

### Comparison

#### GET users

Resolved state is being passed through `res.locals.resolved` because in most cases you'd like to wrap state and errors in your app's responses.

##### express-native-promise-router
```JavaScript
const router = new PromiseRouter();

// By returning a promise rejections are automatically passed to next().
router.get('/users', (req, res) => {
  return db.collection('users').find({}).toArray();
});

router.use((req, res) => {
  res.json({ data: res.locals.resolved });
});

app.use(router);
```
##### co
```JavaScript
app.get('/users', (req, res, next) => co(function* () {
  res.locals.resolved = yield db.collection('users').find({}).toArray();
}).catch(next));

app.use((req, res) => {
  res.json({ data: res.locals.resolved });
});
```
