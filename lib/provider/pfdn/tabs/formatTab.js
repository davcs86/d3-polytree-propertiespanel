'use strict';

var nodeFormatProps = require('./parts/nodeFormatProps'),
    linkFormatProps = require('./parts/linkFormatProps'),
    labelFormatProps = require('./parts/labelFormatProps'),
    gridFormatProps = require('./parts/gridFormatProps')
    ;

function formatTab(element, icons) {

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

  var gridFormatGroup = {
    id: 'gridFormat',
    label: 'Grid format',
    entries: []
  };

  nodeFormatProps(elemFormatGroup, element, icons);
  linkFormatProps(elemFormatGroup, element);
  labelFormatProps(labelFormatGroup, element);
  gridFormatProps(gridFormatGroup, element);

  return {
    id: 'format',
    label: 'Format',
    groups: [
      elemFormatGroup,
      labelFormatGroup,
      gridFormatGroup
    ]
  };

}

module.exports = formatTab;