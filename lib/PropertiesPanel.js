'use strict';

require('./style.scss');

function PropertiesPanel(sideTabsProvider, eventBus, modelling, propertiesProvider) {
  this._sideTabsProvider = sideTabsProvider;
  this._eventBus = eventBus;
  this._modelling = modelling;
  this._propertiesProvider = propertiesProvider;
};

PropertiesPanel.$inject = [
  'sideTabsProvider',
  'eventBus',
  'modeling',
  'propertiesProvider'
];

module.exports = PropertiesPanel;