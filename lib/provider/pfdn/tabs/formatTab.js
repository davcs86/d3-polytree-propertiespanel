'use strict';

//var nodeFormatProps = require('./parts/nodeFormatProps'),
    //linkFormatProps = require('./parts/linkFormatProps'),
    //labelFormatProps = require('./parts/labelFormatProps'),
    //;

function formatTab(element) {

  var elemFormatGroup = {
    id: 'elementFormat',
    label: 'Element format',
    entries: []
  };

  var labelFormatGroup = {
    id: 'labelFormat',
    label: 'Label format',
    entries: []
  };

  //nodeFormatProps(elemFormatGroup, element);
  //linkFormatProps(elemFormatGroup, element);
  //labelFormatProps(labelFormatGroup, element);

  return {
    id: 'format',
    label: 'Format',
    groups: [
      elemFormatGroup,
      labelFormatGroup
    ]
  };

}

module.exports = formatTab;