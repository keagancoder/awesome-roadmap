/* jshint node:true */
"use strict";

/**
 * Sticks a url at the bottom of the page. Simple.
 */
module.exports = function(content, badgeUrl, linkUrl) {
  var plainUrl = linkUrl.split('?')[0];
  return content + '\nJoin the chat: '+ plainUrl + '\n';
};
