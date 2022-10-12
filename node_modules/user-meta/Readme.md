# user-meta

Read user name, email and URL from `.npmrc` or `.gitconfig`.

## Installation

```shell
npm install user-meta
```

## Usage

```js
const { name, email, url } = require('user-meta');
```

## How it works

It tries to read data from your npm and Git configs:

| Property | npm | Git |
| -------- | --- | --- |
| `name` | `npm get init-author-name` | `git config user.name` |
| `email` | `npm get init-author-email` | `git config user.email` |
| `url` | `npm get init-author-url` | — |

Npm has priority over Git. `git` binary is required and used to read Git configuration. Don’t use this module if performance is important.

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/user-meta/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/sapegin/user-meta/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
