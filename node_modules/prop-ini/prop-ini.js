/* global require,exports */

/** 
 * @module {PropINI} NodeJS module/utility for reading/writing/managing INI/Property files
 * @author Paul Bennet
 */

(function () {
	"use strict";

	var _extend = require("extend");
	var _fs = require("fs");

	var GLOBAL_SECTION = "_global";
	var SECTION_REGEX = /^(?:\[(.+)\])$/i;
	var PROPERTY_REGEX = /(?:([^=]+)\=(.+))/i;
	var DEFAULT_LINE_SEPARATOR = "\n";

	/**
	 * Utility function which calls 'extend' module to clone a object
	 * Note: Private function
	 * @function
	 * @param   {object} [sourceObject={}] The object to be cloned. Can be Object/Array.
	 * @returns {object} The cloned object will be returned
	 */
	var _cloneObject = function (sourceObject) {
		sourceObject = sourceObject || {};

		if (sourceObject.constructor !== Array && typeof sourceObject !== "object") {
			return sourceObject;
		}

		var newObject = (sourceObject.constructor === Array) ? [] : {};

		return _extend(true, newObject, sourceObject);
	};


	/**
	 * Utility function which writes given data to a file
	 * Note: Private function
	 * @function
	 * @param   {object}  [args={file,data}] Object hash which has the path to output 'file', encoding 'charset' & the text 'data' to be written on the file
	 * @returns {boolean} On success/failure returns true/false
	 */
	var _writeFile = function (args) {
		args = args || {};
		args.file = args.file || "";
		args.charset = args.charset || "utf-8";
		args.data = args.data || "";

		try {
			_fs.writeFileSync(args.file, args.data, args.charset);
			return true;
		} catch (err) {}

		return false;
	};

	/**
	 * Utility function which reads a file a returns the text data
	 * Note: Private function
	 * @function
	 * @param   {object}   [args={file}] Object hash which has the path to output 'file' & encoding 'charset'
	 * @returns {string} On sucess/failure returns string-data/undefined
	 */
	var _readFile = function (args) {
		args = args || {};
		args.file = args.file || "";
		args.charset = args.charset || "utf-8";

		var data;

		try {
			data = _fs.readFileSync(args.file, args.charset);
		} catch (err) {}

		return data;
	};

	/**
	 * Utility function which checks if a line of text from a property file is a comment
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {boolean} If line is a comment returns true, otherwise false
	 */
	var _isComment = function (line) {
		line = line || "";
		line = line.trim();

		if (line.charAt(0) === "#") {
			return true;
		}

		return false;
	};

	/**
	 * Utility function which checks if a line of text from a property file is empty
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {boolean} If line is empty returns true, otherwise false
	 */
	var _isEmpty = function (line) {
		line = line || "";
		line = line.trim();

		if (line.length === 0) {
			return true;
		}

		return false;
	};

	/**
	 * Utility function to parse a 'section' info from a line of text from a property file
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {string} If section info is found returns 'section' as string, otherwise undefined is returned
	 */
	var _getSection = function (line) {
		line = line || "";
		line = line.trim();

		var section;

		SECTION_REGEX.lastIndex = 0;

		var result = SECTION_REGEX.exec(line);

		if (result && result[1]) {
			section = result[1];
		}

		return section;
	};

	/**
	 * Utility function which checks if a line of text from a property file is a section
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {boolean} If line is a section returns true, otherwise false
	 */
	var _isSection = function (line) {
		var section = _getSection(line);

		if (section) {
			return true;
		}

		return false;
	};

	/**
	 * Utility function to parse a 'property' info from a line of text from a property file
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {object} If property info is found returns an object with 'key', 'value', otherwise undefined is returned
	 */
	var _getProperty = function (line) {
		line = line || "";

		PROPERTY_REGEX.lastIndex = 0;

		var result = PROPERTY_REGEX.exec(line);

		var property;

		if (result && result[1] && result[2]) {
			property = {
				key: (result[1]).trim(),
				value: (result[2])
			};
		}

		return property;
	};

	/**
	 * Utility function which checks if a line of text from a property file is a property
	 * Note: Private function
	 * @function
	 * @param   {string}  [line=""] A single line of text
	 * @returns {boolean} If line contains a property definition returns true, otherwise false
	 */
	var _isProperty = function (line) {
		var property = _getProperty(line);

		if (property) {
			return true;
		}

		return false;
	};

	/**
	 * Utility funtion which finds the 'type' and appropriate 'data' from a line of text from a property file 
	 * Note: Private function
	 * @function
	 * @param   {string} line A single line of text
	 * @returns {object} Returns an object having 'type', 'data' keys. 'type' will have values from [unknown, comment, empty, section, property]. 'data' may contain section or {key, value} property object
	 */
	var _getLineType = function (line) {
		var result = {
			type: "unknown",
			data: undefined
		};

		if (_isComment(line)) {
			result.type = "comment";
		} else if (_isEmpty(line)) {
			result.type = "empty";
		} else if (_isSection(line)) {
			result.type = "section";
			result.data = _getSection(line);
		} else if (_isProperty(line)) {
			result.type = "property";
			result.data = _getProperty(line);
		}

		return result;
	};

	/**
	 * Parses INI/Property file format string data and returns appropriate JS objects
	 * Note: Private function
	 * @function
	 * @param   {object} [config={data}] Object hash having,
	 *                                   1. 'data' - string text.
	 *                                   2. 'lineSeparator' - default is "\n"
	 * @returns {object} On successfull parse returns an Object having,
	 *                   1. 'sections' - section 'titles' at top level and all properties within them as child properties for each section. A special section called '_global' will have global properties which don't come under any section.
	 *                   2. 'sectionOrder' - An array containing name of sections in the order they were defined in the ini/properties file
	 */
	var _parseINIFormatData = function (config) {
		config = config || {};

		var data = config.data || "";
		var lineSep = config.lineSeparator || DEFAULT_LINE_SEPARATOR;

		var lines = data.split(lineSep);

		var sections = {};
		sections[GLOBAL_SECTION] = {};

		var sectionOrder = [GLOBAL_SECTION];

		var globalSection = sections[GLOBAL_SECTION];

		var currentSection = globalSection;

		lines.forEach(function (line) {
			var lineType = _getLineType(line);

			if (lineType.type === "section") {
				sections[lineType.data] = {};
				currentSection = sections[lineType.data];

				sectionOrder.push(lineType.data);
			} else if (lineType.type === "property") {
				currentSection[lineType.data.key] = lineType.data.value;
			}
		});

		return {
			sections: sections,
			sectionOrder: sectionOrder
		};
	};

	/**
	 * Dumps JS objects, which was parsed by this module, back to INI/Property file format string data
	 * Note: Private function
	 * @function
	 * @param   {object} [args={data}] Object hash having,
	 *                               1. 'data' - Object with child properties 'sections', 'sectionOrder'.
	 *                               -- 'sections' object should have '_global' section
	 *                               -- 'sectionOrder' array is required
	 *                               2. 'lineSeparator' - default is "\n".
	 *                               3. 'sortSections' - true/false - Sections will be sorted using 'localCompare'
	 *                               4. 'sortKeys' - true/false - Keys will be sorted using 'localCompare'
	 * @returns {string} On successfull dump, INI/Property format string data will be returned
	 */
	var _dumpINIFormatData = function (args) {
		args = args || {};

		var data = args.data || {};
		var lineSep = args.lineSeparator || DEFAULT_LINE_SEPARATOR;

		if (!data.sections || !data.sections[GLOBAL_SECTION] || !data.sectionOrder) {
			return;
		}

		data.sections = _cloneObject(data.sections);
		data.sectionOrder = _cloneObject(data.sectionOrder);

		var lines = [];

		var _alphaSorter = function (op1, op2) {
			return op1.localeCompare(op2);
		};

		if (args.sortSections) {
			data.sectionOrder = data.sectionOrder.sort(_alphaSorter);

			data.sectionOrder.splice(data.sectionOrder.indexOf(GLOBAL_SECTION), 1);
			data.sectionOrder.unshift(GLOBAL_SECTION);
		}

		data.sectionOrder.forEach(function (section, index) {
			var isLast = (data.sectionOrder.length === index + 1);

			if (section !== GLOBAL_SECTION) {
				lines.push(["[", section, "]"].join(""));
			}

			var sectionData = data.sections[section];
			var sectionKeys = Object.keys(sectionData);

			if (args.sortKeys) {
				sectionKeys = sectionKeys.sort(_alphaSorter);
			}

			sectionKeys.forEach(function (key) {
				lines.push([key, sectionData[key]].join("="));
			});

			if (!isLast) {
				lines.push("");
			}
		});

		lines = lines.join(lineSep);

		return lines;
	};

	// <class> PropINI
	/**
	 * PropINI - Wrapper class for INI/Property file decode/encode functionalities
	 * Note: Private class. Exported via factory function.
	 * @class
	 * @constructs PropINI
	 * @param {object} [config={}] Initialization config data. Currently not used.
	 */
	var PropINI = function (config) {
		config = config || {};

		this.sectionOrder = [];
		this.sections = {};
		this.sections[GLOBAL_SECTION] = {};
	};

	/**
	 * Encodes JS object data into INI/Property format string data
	 * @function
	 * @param   {object} [config={lineSeparator,sortSections,sortKeys,file,charset}] Object hash which has encode config
	 *                                                                             1. 'lineSeparator' - default "\n". Output data will be line separated by the given character
	 *                                                                             2. 'sortSections' - sort sections with 'localeCompare'
	 *                                                                             3. 'sortKeys' - sort keys under each section with 'localCompare'
	 *                                                                             4. 'file' - Optional output 'file'. Data will be written to file
	 *                                                                             5. 'charset' - default "utf-8" - File will be written with this encoding
	 * @returns {string} INI/Property formatted string data
	 */
	PropINI.prototype.encode = function (config) {
		config = config || {};

		var dumpedData = _dumpINIFormatData({
			data: {
				sections: this.sections,
				sectionOrder: this.sectionOrder
			},
			lineSeparator: config.lineSeparator,
			sortSections: config.sortSections,
			sortKeys: config.sortKeys,
			sortValues: config.sortValues
		});

		if (config.file) {
			_writeFile({
				file: config.file,
				data: dumpedData,
				charset: config.charset
			});
		}

		return dumpedData;
	};

	/**
	 * Decodes INI/Property format string data into JS object data
	 * @function
	 * @param   {object} [config={data,file,charset}] Object hash which has encode config
	 *                                                1. 'lineSeparator' - default "\n". Input data will be line splitted by the given character
	 *                                                2. 'file' - Optional input 'file'. Data will be read from this file
	 *                                                3. 'charset' - default "utf-8" - File will be read with this encoding
	 * @returns {object} Object hash containing 'sections' & 'sectionOrder' will be returned. Also data will be saved to this class instance
	 */
	PropINI.prototype.decode = function (config) {
		config = config || {};

		var data = config.data || "";
		var file = config.file || "";

		if (file) {
			data = _readFile({
				file: file,
				charset: config.charset
			});
		}

		var parsedData = _parseINIFormatData({
			data: data,
			lineSeparator: config.lineSeparator
		});

		this.sections = parsedData.sections;
		this.sectionOrder = parsedData.sectionOrder;

		return {
			sections: _cloneObject(this.sections),
			sectionOrder: _cloneObject(this.sectionOrder)
		};
	};

	/**
	 * Removes a particular key from a section or a whole section or the whole data from this instance
	 * - If only 'section' is provided. Whole section will be removed. If global section is given it will be reset.
	 * - If only 'key' is provided. Key from global section will be removed
	 * - If no section, key is provided, whole data will be reset
	 * @function
	 * @param   {string} section Section to delete
	 * @param   {string} key     Key/Property to delete
	 * @returns {boolean}  On success/failure returns true/false
	 */
	PropINI.prototype.removeData = function (section, key) {

		var targetSection;

		if (!key && !section) {
			this.sections = {};
			this.sections[GLOBAL_SECTION] = {};
			this.sectionOrder = [GLOBAL_SECTION];
		} else if (key && section) {
			targetSection = this.sections[section];
			delete targetSection[key];
		} else if (section) {
			if (section === GLOBAL_SECTION) {
				this.sections[section] = {};
			} else {
				delete this.sections[section];
				this.sectionOrder.splice(this.sectionOrder.indexOf(section), 1);
			}
		} else if (key) {
			targetSection = this.sections[GLOBAL_SECTION];
			delete targetSection[key];
		}

		return true;
	};

	/**
	 * Adds a key to a section, a whole section or the replaces the whole data
	 * - If both section name, key name is given - value should be a string
	 * - If section name is given - value should be an object of key-value pairs
	 * - If key name is given - value should be a string, and key will be added to global section
	 * - If no section, key is given - value should be an object containing 'sections', 'sectionOrder' properties. 'sections' should have a '_global' property.
	 * @function
	 * @param   {object/string}   value   Based on the values of section & key the type of this param will vary
	 * @param   {string} section Section name
	 * @param   {string} key     Key/Property name
	 * @returns {boolean}  On success/failure returns true/false
	 */
	PropINI.prototype.addData = function (value, section, key) {

		var targetSection;

		if (key) {

			if (typeof key !== "string" || typeof value !== "string") {
				return false;
			}

			if (section && section !== GLOBAL_SECTION) {
				this.sections[section] = this.sections[section] || {};
				targetSection = this.sections[section];
			} else {
				targetSection = this.sections[GLOBAL_SECTION];
			}

			targetSection[key] = value;

		} else if (section) {

			if (typeof value !== "object") {
				return false;
			}

			if (section && section !== GLOBAL_SECTION) {
				this.sections[section] = this.sections[section] || {};
				this.sections[section] = value;

				if (this.sectionOrder.indexOf(section) === -1) {
					this.sectionOrder.push(section);
				}
			} else {
				this.sections[GLOBAL_SECTION] = value;
			}

		} else {

			if (typeof value !== "object") {
				return false;
			}

			if (!value.sections || !value.sections[GLOBAL_SECTION]) {
				return false;
			}

			this.sections = value.sections;

			if (!value.sections.sectionOrder) {
				value.sections.sectionOrder = Object.keys(value.sections);
				value.sections.sectionOrder.splice(value.sections.sectionOrder.indexOf(GLOBAL_SECTION), 1);
				value.sections.sectionOrder.unshift(GLOBAL_SECTION);
			}

		}

		return true;
	};

	/**
	 * Returns data from the current instance for the passed params
	 * - If section, key is given - string value of the key will be returned
	 * - If only section is given - Object of properties of that section is returned
	 * - If only key is given - string value of key from global section will be returned
	 * - If none is given - Object with 'sections', 'sectionOrder' properties will be given
	 * @function
	 * @param   {string} section Name of section
	 * @param   {string} key     Name of key/property
	 * @returns {object/string} Based on the input types output type will vary
	 */
	PropINI.prototype.getData = function (section, key) {
		var data = this.sections;

		if (section) {
			data = _cloneObject(data[section]);
		}

		if (key) {

			if (!section) {
				section = GLOBAL_SECTION;
				data = _cloneObject(data[section]);
			}

			data = data[key];
		}

		if (!section && !key) {
			data = {
				sections: _cloneObject(this.sections),
				sectionOrder: _cloneObject(this.sectionOrder)
			};
		}

		return data;
	};

	/**
	 * Returns section names as an Array in order as same in the sectionOrder property of this instance
	 * - Global section is excluded
	 * @function
	 * @returns {array} Array of section names
	 */
	PropINI.prototype.getSections = function () {
		var sectionNames = _cloneObject(this.sectionOrder);
		var globalIndex = sectionNames.indexOf(GLOBAL_SECTION);

		sectionNames.splice(globalIndex, 1);

		return sectionNames;
	};
	// <class> PropINI

	/**
	 * Factory function to create instance for PropINI class
	 * Note: Module Export
	 * @function
	 * @param   {object} config Initialize object for the constructor
	 * @returns {object} new instance of PropINI class
	 */
	exports.createInstance = function (config) {
		return (new PropINI(config));
	};

}());
