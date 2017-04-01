'use strict';

var nameProps = require('./parts/nameProps')
    //tagProps = require('./parts/tagProps'),
    //buildLabelProps = require('./parts/buildLabelProps'),
    ;

function propertiesTab(element) {

  var generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };

  nameProps(generalGroup, element);
  //tagProps(generalGroup, element);
  //buildLabelProps(generalGroup, element);
  //labelContentProps(generalGroup, element);

  return {
    id: 'properties',
    label: 'Properties',
    groups: [
      generalGroup
    ]
  };

}

module.exports = propertiesTab;