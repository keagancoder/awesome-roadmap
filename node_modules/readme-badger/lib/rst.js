/* jshint node:true */
"use strict";

// http://docutils.sourceforge.net/docs/user/rst/quickref.html#section-structure
var ACCEPTED_CHARS = ['=', '-', '`', ':', "'", '"', '~', '^', '_', '*', '+', '#', '<', '>'];

function badger(content, imgUrl, linkUrl, altText) {
  var lines = content.split('\n');
  var idealLine = findIdealLineForInsert(lines);
  var badgeContent = '\n.. image:: ' + imgUrl + '\n' +
                       '   :alt: ' + altText + '\n' +
                       '   :target: ' + linkUrl;
  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  var lineIdx = 1;
  var chrIdx = 0;
  var seenHeader = false;

  for(; lineIdx < lines.length; lineIdx++) {
    var line = lines[lineIdx];
    var lineAbove = lines[lineIdx - 1];
    var chrSeen = {};
    for(; chrIdx < line.length; chrIdx++) {
      chrSeen[line[chrIdx]] = null;
    }
    var uniqChars = Object.keys(chrSeen);
    if(uniqChars.length === 1
       && ACCEPTED_CHARS.indexOf(uniqChars[0]) !== -1
       && line.length >= lineAbove.length) {
        seenHeader = true;
    } else {
      if(seenHeader) break;
    }
  }

  return lineIdx;
}

module.exports = badger;
