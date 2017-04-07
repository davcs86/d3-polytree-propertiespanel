'use strict';

var propertiesTab = require('./tabs/propertiesTab'),
    formatTab = require('./tabs/formatTab')
    ;

function PfdnPropertiesProvider(icons) {
  this._icons = icons;
}

PfdnPropertiesProvider.$inject = [
  'icons',
];

//inherits(BpmnPropertiesProvider, PropertiesActivator);

module.exports = PfdnPropertiesProvider;

PfdnPropertiesProvider.prototype.getTabs = function(element){
  console.log(element);
  var icons = this._icons;
  return [
    propertiesTab(element),
    formatTab(element, icons)
  ];
};