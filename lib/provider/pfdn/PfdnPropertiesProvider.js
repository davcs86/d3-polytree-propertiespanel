'use strict';

// var inherits = require('inherits');
//
// var PropertiesActivator = require('../../PropertiesActivator');
//

var propertiesTab = require('./tabs/propertiesTab'),
    formatTab = require('./tabs/formatTab')
    ;

function PfdnPropertiesProvider(eventBus) {
  //PropertiesActivator.call(this, eventBus);
}

PfdnPropertiesProvider.$inject = [
  'eventBus',
];

//inherits(BpmnPropertiesProvider, PropertiesActivator);

module.exports = PfdnPropertiesProvider;

PfdnPropertiesProvider.prototype.getTabs = function(element){
  return [
    propertiesTab(element),
    formatTab(element)
  ];
};