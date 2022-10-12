/* globals require,console */

var PropINI = require("../prop-ini.js");

var instance = PropINI.createInstance({});

instance.decode({
	file: "./sample/test.properties"
});

instance.encode({
	sortSections: true,
	sortKeys: true,
	file: "./sample/test_new.properties"
});