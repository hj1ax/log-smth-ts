# Hello

What are you doing here?

Anyway;
Install it via npm or yarn;

```sh
yarn add log-smth # or
npm i log-smth
```

```js
const { Logger } = require('log-smth'); // import { Logger } from 'log-smth';

const logger = new Logger({
    timestamps: true, // or false, if you don't want timestamps.
    /*
     / this is which log type should be used if none is specified, defaults to log normally.
     / It can be pretty much anything as long as it is a string.
    */
    defaultLog: 'Wassup',
    logFile: true, // wheter you want to log to a json file or not.
    logDirPath: __dirname, // path to the directory where the log.json file will be created.
    whichLogLevelsShouldBeLogged: ['error', 'warn'],
});

logger.log('Hello!', 'error');
logger.log('Hello!', 'log');
logger.log('Hello!', 'debug');
logger.log('Hello!', 'info');
logger.log('Hello!', 'warn');
logger.log('Hello!');
```

