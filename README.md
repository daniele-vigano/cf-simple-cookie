# 🍪 CF Simple Cookie - Lightweight JavaScript Cookie Management Library

[![npm version](https://img.shields.io/npm/v/cf-simple-cookie.svg)](https://www.npmjs.com/package/cf-simple-cookie)
[![npm downloads](https://img.shields.io/npm/dm/cf-simple-cookie.svg)](https://www.npmjs.com/package/cf-simple-cookie)
[![license](https://img.shields.io/npm/l/cf-simple-cookie.svg)](https://github.com/daniele-vigano/cf-simple-cookie/blob/main/LICENSE)

A **vanilla JavaScript** lightweight cookie management library with **zero dependencies** for reading, writing, and deleting browser cookies. Perfect for modern web applications that need simple, efficient cookie handling without external dependencies.

## Features

- **Lightweight** - Zero dependencies, minimal footprint
- **Easy to use** - Simple and intuitive API
- **Auto JSON handling** - Automatically serializes/deserializes objects
- **Universal** - Works with ES modules, CommonJS, and UMD
- **Modern** - Written in vanilla JavaScript ES6+

## Installation

Install via npm:

```bash
npm install cf-simple-cookie
```

Install via yarn:

```bash
yarn add cf-simple-cookie
```

Install via pnpm:

```bash
pnpm add cf-simple-cookie
```

Or use it directly in the browser via CDN:

```html
<script type="module">
  import Cookie from 'https://unpkg.com/cf-simple-cookie';
</script>
```

## Quick Start

```javascript
import Cookie from 'cf-simple-cookie';

// Set a simple cookie
Cookie.set('username', 'John Doe');

// Get a cookie
const username = Cookie.get('username');
console.log(username); // "John Doe"

// Delete a cookie
Cookie.delete('username');
```

## Examples

### Setting Cookies

#### Simple String Cookie

```javascript
import Cookie from 'cf-simple-cookie';

// Set a cookie with default options (session cookie)
Cookie.set('theme', 'dark');
```

#### Cookie with Expiration Date

```javascript
// Set a cookie that expires in 7 days
const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
Cookie.set('sessionId', 'abc123', expirationDate);
```

#### Cookie with Custom Path

```javascript
// Set a cookie for a specific path
const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
Cookie.set('preference', 'value', expires, '/admin');
```

#### Storing Objects (JSON)

```javascript
// Store complex objects - automatically serialized to JSON
const userData = {
  name: 'Charlie',
  city: 'New York',
  preferences: {
    theme: 'dark',
    language: 'en'
  }
};

const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
Cookie.set('user', userData, expires, '/');
```

### Getting Cookies

```javascript
// Get a simple string cookie
const theme = Cookie.get('theme');

// Get an object cookie (automatically parsed from JSON)
const user = Cookie.get('user');
console.log(user.name); // "Charlie"
console.log(user.city); // "New York"

// Returns empty string if cookie doesn't exist
const nonExistent = Cookie.get('doesNotExist'); // ""
```

### Deleting Cookies

```javascript
// Delete a cookie
Cookie.delete('theme');

// Delete a cookie from a specific path
Cookie.delete('preference', '/admin');
```

## API Reference

### `Cookie.set(cookieName, value, expires, path)`

Sets a cookie in the browser.

**Parameters:**

| Parameter    | Type     | Default    | Description                                                             |
|--------------|----------|------------|-------------------------------------------------------------------------|
| `cookieName` | `string` | *required* | The name of the cookie                                                  |
| `value`      | `string  | object`    | *required*                                                              | The value to store (objects are automatically JSON-stringified) |
| `expires`    | `string` | `''`       | Expiration date in UTC string format (e.g., `new Date().toUTCString()`) |
| `path`       | `string` | `'/'`      | The cookie path                                                         |

**Example:**

```javascript
Cookie.set('token', 'xyz789', new Date('2027-12-31').toUTCString(), '/');
```

---

### `Cookie.get(cookieName)`

Retrieves a cookie value from the browser.

**Parameters:**

| Parameter    | Type     | Description                        |
|--------------|----------|------------------------------------|
| `cookieName` | `string` | The name of the cookie to retrieve |

**Returns:** `string | object | ''` - The cookie value (automatically parsed from JSON if applicable), or empty string if not found

**Example:**

```javascript
const token = Cookie.get('token');
```

---

### `Cookie.delete(cookieName, path)`

Deletes a cookie from the browser.

**Parameters:**

| Parameter    | Type     | Default     | Description                                                        |
|--------------|----------|-------------|--------------------------------------------------------------------|
| `cookieName` | `string` | *required*  | The name of the cookie to delete                                   |
| `path`       | `string` | `undefined` | The cookie path (must match the path used when setting the cookie) |

**Example:**

```javascript
Cookie.delete('token', '/');
```

## License

MIT

## Links

- [GitHub Repository](https://github.com/daniele-vigano/cf-simple-cookie)
- [npm Package](https://www.npmjs.com/package/cf-simple-cookie)
- [Report Issues](https://github.com/daniele-vigano/cf-simple-cookie/issues)

---

## Keywords

`javascript cookie`, `browser cookie management`, `vanilla js cookie`, `cookie library`, `javascript cookie parser`, `cookie helper`, `lightweight cookie`, `zero dependencies`, `es6 cookie`, `cookie storage`, `browser storage`, `web storage`, `cookie manipulation`, `set cookie javascript`, `get cookie javascript`, `delete cookie javascript`