/* jshint node:true */
"use strict";

function badger(content, imgUrl, linkUrl, altText) {
  var lines = content.split('\n');
  var idealLine = findIdealLineForInsert(lines);
  var badgeContent = '\n<a href="' + linkUrl + '"><img src="' + imgUrl + '" alt="' + altText + '"/></a>';

  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  var i = 0;
  var seenHeader = false;

  for(; i < lines.length; i++) {
    if(/^\s*(\=+)/.test(lines[i])) {
      seenHeader = true;
    } else {
      if(seenHeader) break;
    }
  }

  return i;
}

module.exports = badger;
