/* jshint node:true, unused:strict */
/* global describe:true, it:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var badger = require('..');

describe('readme-badger', function() {

  var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
  var linkUrl = 'https://gitter.im/myorg/myrepo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge';
  var altText = 'Join the chat at https://gitter.im/myorg/myrepo';

  it('inserts into markdown', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into markdown that already has a badge', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into markdown that already has a badge with parenthesis link', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-parenthesis-link-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-parenthesis-link-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into markdown that has empty badge', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-empty-badge-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-empty-badge-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into markdown that has inline badge', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-inline-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-hasbadge-inline-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into markdown that content follows the title without empty line', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-tense-title-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-tense-title-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into textile', function() {
    var before = fs.readFileSync(__dirname + '/examples/textile-before.textile', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/textile-after.textile', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'textile', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into rdoc', function() {
    var before = fs.readFileSync(__dirname + '/examples/rdoc-before.rdoc', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/rdoc-after.rdoc', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'rdoc', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into orgmode', function() {
    var before = fs.readFileSync(__dirname + '/examples/orgmode-before.org', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/orgmode-after.org', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'org', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into mediawiki', function() {
    var before = fs.readFileSync(__dirname + '/examples/mediawiki-before.mediawiki', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/mediawiki-after.mediawiki', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'mediawiki', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into asciidoc', function() {
    var before = fs.readFileSync(__dirname + '/examples/asciidoc-before.asciidoc', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/asciidoc-after.asciidoc', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'asciidoc', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into pod', function() {
    var before = fs.readFileSync(__dirname + '/examples/pod-before.pod', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/pod-after.pod', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'pod', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into plaintext', function() {
    var before = fs.readFileSync(__dirname + '/examples/plaintext-before.txt', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/plaintext-after.txt', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'txt', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into unsupported filetypes', function() {
    var before = fs.readFileSync(__dirname + '/examples/plaintext-before.txt', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/plaintext-after.txt', { encoding: 'utf8' });

    var result = badger.addBadge(before, null, imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into empty files', function () {
    var before =  fs.readFileSync(__dirname + '/examples/empty-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/empty-after.md', { encoding: 'utf8' });
    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);
    assert.equal(result, after)
  })
});
