/* jshint node:true */
"use strict";

var markdownBadger = require('./markdown');
var textileBadger = require('./textile');
var rdocBadger = require('./rdoc');
var orgmodeBadger = require('./orgmode');
var mediawikiBadger = require('./mediawiki');
var rstBadger = require('./rst');
var asciidocBadger = require('./asciidoc');
var podBadger = require('./pod');
var plaintextBadger = require('./plaintext');
var assert = require('assert');

var markupBadgers = {
  markdown: markdownBadger,
  mdown: markdownBadger,
  mkdn: markdownBadger,
  md: markdownBadger,

  textile: textileBadger,

  rdoc: rdocBadger,

  org: orgmodeBadger,

  mediawiki: mediawikiBadger,
  wiki: mediawikiBadger,

  rst: rstBadger,

  asciidoc: asciidocBadger,
  adoc: asciidocBadger,
  asc: asciidocBadger,

  pod: podBadger
};

var addBadge = function(content, fileExt, imageUrl, linkUrl, altText) {
  assert(typeof content === 'string', 'readme content required');
  assert(imageUrl, 'badge imageUrl required');
  assert(linkUrl, 'badge linkUrl required');
  assert(altText, 'badge altText required');

  var plaintextBadger = function(content) {
    return content + '\n' + altText + '\n';
  };

  // failover to plaintext
  var badger = markupBadgers[fileExt && fileExt.toLowerCase()] || plaintextBadger;

  return badger(content, imageUrl, linkUrl, altText);
};

var hasImageSupport = function(fileExt) {
  return !!markupBadgers[fileExt && fileExt.toLowerCase()];
};

module.exports = {
  addBadge: addBadge,
  hasImageSupport: hasImageSupport
};
