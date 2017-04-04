'use strict';

var entryFactory = require('../../../../factory/EntryFactory'),
    is = require('../../../../utils/modelUtils').is;

function nameProps(group, element) {
  if (is(element, 'TextAnnotation')) {
    group.entries.push(entryFactory.textField({
      id: 'name',
      label: 'Name',
      modelProperty: 'name',
      get: function(element) {
        //return getBusinessObject(element).id;
      },
      set: function(element, properties) {
        //return cmdHelper.updateProperties(element, properties);
      },
      validate: function(element, values) {
        //return idError ? { id: idError } : {};
      }
    }));
  }
}

module.exports = nameProps;