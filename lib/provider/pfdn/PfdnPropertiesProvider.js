'use strict';

var propertiesTab = require('./tabs/propertiesTab'),
    is = require('../../utils/modelUtils').is,
    formatTab = require('./tabs/formatTab')
    ;

function PfdnPropertiesProvider(icons, entryFactory, eventBus, modelling) {
  this._icons = icons;
  this._entryFactory = entryFactory;
  this._eventBus = eventBus;
  this._modelling = modelling;
}

PfdnPropertiesProvider.$inject = [
  'icons',
  'entryFactory',
  'eventBus',
  'modelling'
];

module.exports = PfdnPropertiesProvider;

PfdnPropertiesProvider.prototype.updateDrawing = function(definition){
  console.log('_updateDrawing', definition);
  if (is(definition, 'pfdn:Settings')){
    // trigger to redraw the axes
    this._eventBus.emit('canvas.resized');
  } else if (is(definition, 'pfdn:Label')){
    this._modelling._elements.label._labels._builder(definition);
  } else if (is(definition, 'pfdn:Link')){
    this._modelling._elements.link._links._builder(definition);
    this._modelling._elements.label._labels._builder(definition.label);
  } else if (is(definition, 'pfdn:Node')){
    this._modelling._elements.node._nodes._builder(definition);
    this._modelling._elements.label._labels._builder(definition.label);
  }
};

PfdnPropertiesProvider.prototype.getTabs = function(element){
  var icons = this._icons,
      entryFactory = this._entryFactory;
  return [
    propertiesTab(element, entryFactory),
    formatTab(element, entryFactory, icons)
  ];
};