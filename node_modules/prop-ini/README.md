# PropINI

Read, Write, Encode, Decode & Manage INI/Property files with ease.

#
##### Install
#
> npm install prop-ini

#
##### Usage
#
1] Require the module in your code
```javascript
    var PropINI = require("prop-ini");
```
#
2] Create new instance for PropINI
```javascript
    var piTheOne = PropIni.createInstance();
```

#
3] Decode/Read data
```javascript
    var iniData = piTheOne.decode(<config>);
```
`<config>` is an object with following props
- `config.data` - Pass the INI/Properties format data directly as a string
- `config.file` - Tell the function to get the data from this file
- `config.charset` - Tell function to read file by this encoding
- `config.lineSeparator` - Tell function to split lines based on this char

The returned `iniData` is an object with following props
- `iniData.sections` - Object containing sections as top-level nodes and properties of appropriate sections as child nodes for them. `_global` is a special section where properties without any section are available
- `iniData.sectionOrder` - Array of section names in exact order matching the parsed data. `_global` will be the first entry

On successfull decode the parsed values will be stored with the PropINI instance as properties. You may access them using `piTheOne.sections` and `piThOne.sectionOrder`. Handle with care !

#
4] Encode/Write data
```javascript
    var iniString = piTheOne.encode(<config>);
```
`<config>` is an object with following props
- `config.sortSections` - Sort section names using `String.prototype.localeCompare`
- `config.sortKeys` - Sort properties/keys under each section with `localeCompare`
- `config.file` - Tell function write the encoded data to this file
- `config.charset` - Tell function to write file with this encoding
- `config.lineSeparator` - Tell function to join lines based on this char

The returned `iniString` is a string type variable containg INI/Property file format data
#
##### Other convenience functions (After parsing data ...)
#
1] Get section names as an Array
```javascript
    var sections = piTheOne.getSections();
```
- `sections` is an Array containing all sections in the parsed instance data
- `_global` is excluded
- Parsed section order is maintained

#
2] Get anything you want ! 
```javascript
    var data = piTheOne.getData(<section>, <key>);
```
- `section` is the name of the section. In absense of `key` whole section's object with child properties will be returned
- `key` is the name of the property under some section. In absense of `section`, `_global` section will be used. String value of a key will be returned
- In absense of both `section` & `key`, whole data will be returned as an object with `sections`, `sectionOrder` as properties

#
3] Set anything you want ! 
```javascript
    var success = piTheOne.addData(<value>, <section>, <key>);
```
- `section` is the name of the section. `value` should be given as an object in this case
- `key` is the name of the property under some section. In absense of `section`, `_global` section will be used. `value` should be of String type in this case
- In absense of both `section` & `key`, you can set the whole data for the instance. An object with `sections`, `sectionOrder` as properties should be given for `value`. `sections` property should have `_global` child property.

#
4] Remove anything you want ! 
```javascript
    var success = piTheOne.removeData(<section>, <key>);
```
- `section` is the name of the section. In absense of `key` whole section will be removed.
- `key` is the name of the property under some section. In absense of `section`, `_global` section will be used.
- In absense of both `section` & `key`, whole instance data will be reset to empty state.


#
##### And, one more thing  ...
#
- Since the data is exposed as instance properties you can directly process them as you wish. But please respect the format PropINI expects the data to be in.
- `piTheOne.sections` should always be an object
- `piTheOne.sectionOrder` should always be an array and should be in sync with `piTheOne.sections` data
- `piTheOne.sections` should always have a child object `_global`

#
##### LEGAL STUFF
#
- Check project's license info
