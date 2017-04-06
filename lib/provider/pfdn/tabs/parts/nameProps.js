'use strict';

var entryFactory = require('../../../../factory/EntryFactory'),
    is = require('../../../../utils/modelUtils').is;

function nameProps(group, element) {
  if (is(element, 'pfdn:Node') || is(element, 'pfdn:Link')) {
    group.entries.push(entryFactory.textField({
      id: 'name',
      label: 'Name',
      modelProperty: 'name'
    }));
    group.entries.push(entryFactory.textField({
      id: 'tag',
      label: 'Tag',
      modelProperty: 'tag'
    }));
    group.entries.push(entryFactory.textField({
      id: 'label.text',
      label: 'Diagram label',
      modelProperty: 'label.text'
    }));
  }
}

module.exports = nameProps;