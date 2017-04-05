'use strict';

var entryFactory = require('../../../../factory/EntryFactory'),
    is = require('../../../../utils/modelUtils').is,
    startCase = require('lodash/string').startCase,
    forIn = require('lodash/object').forIn,
    options = require('d3-polytree/lib/draw/icons/svg');

function nodeFormatProps(group, element) {
  var selOptions = [];
  forIn(options, function(v, k){
    selOptions.push({
      value: k,
      name: startCase(k)
    });
  });
  if (is(element, 'pfdn:Node')) {
    group.entries.push(entryFactory.selectBox({
      id: 'icon',
      label: 'Icon',
      modelProperty: 'type',
      allowEmpty: false,
      selectOptions: selOptions
    }));
    group.entries.push(entryFactory.textField({
      id: 'size',
      label: 'Size',
      modelProperty: 'size',
      type: 'number'
    }));
    group.entries.push(entryFactory.colorPicker({
      id: 'fontColor',
      label: 'Color',
      modelProperty: 'fontColor',
      //type: 'number'
    }));
  }
}

module.exports = nodeFormatProps;