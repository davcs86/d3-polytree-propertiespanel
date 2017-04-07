'use strict';

var entryFactory = require('../../../../factory/EntryFactory'),
    is = require('../../../../utils/modelUtils').is;

function linkFormatProps(group, element) {
  if (is(element, 'pfdn:Link')) {
    group.entries.push(entryFactory.textField({
      id: 'lineWidth',
      label: 'Line width',
      modelProperty: 'lineWidth',
      type: 'number'
    }));
    group.entries.push(entryFactory.colorPicker({
      id: 'lineColor',
      label: 'Line color',
      modelProperty: 'lineColor'
    }));
  }
}

module.exports = linkFormatProps;