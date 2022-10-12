readme-badger
=============

[![Build Status](https://travis-ci.org/gitterHQ/readme-badger.svg?branch=master)](https://travis-ci.org/gitterHQ/readme-badger)

Whizzy badges in your READMEs.

Install
-------

`npm install readme-badger`

How To Use
----------

### `addBadge(content, fileExt, imageUrl, linkUrl, altText)`

Returns the content but with a new badge inserted.

* `content`: the text content of a README.
* `fileExt`: the file extension of the README (md, textile, rdoc etc).
* `imageUrl`: the image url for the badge.
* `linkUrl`: the url for the badge to link to.
* `altText`: the alternative if images aren't visible. This will be used on its own for plaintext READMEs, so include a url in the text.

### `hasImageSupport(fileExt)`

Returns true/false depending on whether the format (`fileExt`) will render a badge image or just the altText.

* `fileExt`: the file extension of the README (md, textile, rdoc etc)

Example
-------
```javascript
var badger = require('readme-badger');

var readme = '# My Lovely Library\n' +
             '\n' +
             '## Features\n';
var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
var linkUrl = 'https://gitter.im/gitterHQ/gitter';
var altText = 'Join the chat at https://gitter.im/gitterHQ/gitter';

var readmeWithBadge = badger.addBadge(readme, 'md', imageUrl, linkUrl, altText);

console.log(readmeWithBadge);
// # My Lovely Library
//
// [![Join the chat at https://gitter.im/gitterHQ/gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gitterHQ/gitter)
//
// ## Features
// ...

```

Format (`fileExt`) Support
--------------

readme-badger supports almost all of the [GitHub README markups](https://github.com/github/markup#markups):
* [markdown, mdown, mkdn, md](http://daringfireball.net/projects/markdown/)
* [textile](http://www.textism.com/tools/textile/)
* [rdoc](http://rdoc.sourceforge.net/)
* [org](http://orgmode.org/)
* [mediawiki, wiki](http://www.mediawiki.org/wiki/Help:Formatting)
* [rst](http://docutils.sourceforge.net/rst.html)
* [asciidoc, adoc, asc](http://asciidoc.org/)
* [pod](http://search.cpan.org/dist/perl/pod/perlpod.pod)

It will also failover to inserting the `altText` at the bottom of the README for any format that doesnt have image link support (creole, txt or anything else).

Building Locally
----------------

1. `git clone git@github.com:gitterHQ/readme-badger.git`
2. `cd readme-badger`
3. `npm install`
4. `npm test`

License
-------

MIT
