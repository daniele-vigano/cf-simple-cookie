# Cookie

A vanilla JS lightweight (zero dependencies) library to read, write and delete cookies in the browser.

## Installation

```bash
npm install cf-simple-cookie
```

## Usage

### JavaScript

```javascript
import Cookie from 'cf-simple-cookie';

const cookieName = 'test_1';
const cookieValue = {
    name: 'Charlie',
    city: 'New York'
};

Cookie.delete(cookieName);

Cookie.set(cookieName, cookieValue, new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString(), '/');

const retrivedValue = Cookie.get(cookieName);

console.log(retrivedValue);
```

## License

MIT
