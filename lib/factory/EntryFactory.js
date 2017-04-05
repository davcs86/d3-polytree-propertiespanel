'use strict';

// input entities
var textInputField = require('./TextInputEntryFactory'),
    checkboxField = require('./CheckboxEntryFactory'),
    colorPickerField = require('./ColorPickerEntryFactory'),
    selectBoxField = require('./SelectEntryFactory'),
    comboBoxField = require('./ComboEntryFactory'),
    textAreaField = require('./TextAreaEntryFactory'),
    spreadsheetField = require('./SpreadsheetEntryFactory')
    ;

var modellingHelper = require('../helpers/modellingHelper');

// helpers ////////////////////////////////////////

function ensureNotNull(prop) {
  if(!prop) {
    throw new Error(prop + ' must be set.');
  }

  return prop;
}

/**
 * sets the default parameters which are needed to create an entry
 *
 * @param options
 * @returns {{id: *, description: (*|string), get: (*|Function), set: (*|Function),
 *            validate: (*|Function), html: string}}
 */
var setDefaultParameters = function ( options ) {

  // default method to fetch the current value of the input field
  var defaultGet = function (element, formNode) {
    var res = {},
        prop = ensureNotNull(options.modelProperty);
    res[prop] = element.get(prop);

    return res;
  };

// default method to set a new value to the input field
  var defaultSet = function (element, values) {
    var res = {},
        prop = ensureNotNull(options.modelProperty);

    if (values[prop] !== '') {
      res[prop] = values[prop];
    } else {
      res[prop] = undefined;
    }

    return modellingHelper.updateProperties(element, res);
  };

// default validation method
  var defaultValidate = function () {
    return {};
  };

  return {
    id : options.id,
    description : ( options.description || '' ),
    get : ( options.get || defaultGet ),
    set : ( options.set || defaultSet ),
    validate : ( options.validate || defaultValidate ),
    html: ''
  };
};

function EntryFactory() {

}

/**
 * Generates an text input entry object for a property panel.
 * options are:
 * - id: id of the entry - String
 *
 * - description: description of the property - String
 *
 * - label: label for the input field - String
 *
 * - set: setter method - Function
 *
 * - get: getter method - Function
 *
 * - validate: validation method - Function
 *
 * - modelProperty: name of the model property - String
 *
 * @param options
 * @returns the propertyPanel entry resource object
 */

EntryFactory.textField = function(options) {
  return textInputField(options, setDefaultParameters(options));
};

EntryFactory.checkbox = function(options) {
  return checkboxField(options, setDefaultParameters(options));
};

EntryFactory.textArea = function(options) {
  return textAreaField(options, setDefaultParameters(options));
};

EntryFactory.selectBox = function(options) {
  return selectBoxField(options, setDefaultParameters(options));
};

EntryFactory.colorPicker = function(options) {
  return colorPickerField(options, setDefaultParameters(options));
};

EntryFactory.comboBox = function(options) {
  return comboBoxField(options);
};

EntryFactory.spreadsheet = function(options) {
  return spreadsheetField(options);
};

module.exports = EntryFactory;