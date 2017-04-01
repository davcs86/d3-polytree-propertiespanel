'use strict';

var forEach = require('lodash/collection').forEach,
  isFunction = require('lodash/lang').isFunction,
  isUndefined = require('lodash/lang').isUndefined,
  toSafeInteger = require('lodash/lang').toSafeInteger,
  domify = require('min-dom/lib/domify'),
  domQuery = require('min-dom/lib/query'),
  domAttr = require('min-dom/lib/attr'),
  domClear = require('min-dom/lib/clear'),
  domClasses = require('min-dom/lib/classes'),
  domDelegate = require('min-dom/lib/delegate')
;

require('./style.scss');

function PropertiesPanel(sideTabsProvider, eventBus, modelling, propertiesProvider) {
  this._sideTabsProvider = sideTabsProvider;
  this._eventBus = eventBus;
  this._modelling = modelling;
  this._propertiesProvider = propertiesProvider;
  this._init();
};

PropertiesPanel.$inject = [
  'sideTabsProvider',
  'eventBus',
  'modelling',
  'propertiesProvider'
];

module.exports = PropertiesPanel;

PropertiesPanel.prototype._init = function(){
  this._registerSideTab();
};

PropertiesPanel.prototype._registerSideTab = function(){
  var that = this;
  this._sideTabsProvider.
  registerSideTab({
    title: 'Properties',
    iconClassName: 'icon-sliders',
    action: {
      created: function (content) {
        that._drawPanel(content);
      }//,
      // click: function () {
      //   console.log('that._reIndexItems();', arguments);
      // },
      // close: function () {
      //   console.log('search panel close');
      // }
    },
  }, 1);
};

PropertiesPanel.prototype._drawPanel = function(content){
  //
  this._drawContainer(content);
};

PropertiesPanel.prototype._drawContainer = function(content){
  //
  this._scrolltabsContainer = domify(PropertiesPanel.HTML_MARKUP);

  content.insertBefore(this._sidetabsContainer, content.childNodes[0]);

  this._scrolltabsEntries = domQuery('.pfdjs-pp-tabs', this._scrolltabsContainer);
  this._scrolltabsTabs = domQuery('.tab-sheets', this._scrolltabsEntries);
  this._scrolltabsContents = domQuery('.pfdjs-pp-contents', this._scrolltabsContainer);
};

PropertiesPanel.prototype._update = function(definition){
  //
  if (this._scrolltabsEntries) {
    domClear(this._scrolltabsEntries);
    domClear(this._scrolltabsContents);
  }
  this._drawEntries(definition);
};

PropertiesPanel.prototype._drawEntries = function(definition){
  var that = this,
      tabs = this._propertiesProvider.getTabs(definition);
  // draw the contents

  // draw the tabs
  forEach(tabs, function(t){
    var tab = '<li class="tab-sheet">'+
      '<a href="javascript:void(0)" data-tab-target="'+t.id+'">'+t.label+'</a>'+
      '</li>';
    that._scrolltabsTabs.appendChild(tab);
  });
};

/* markup definition */

PropertiesPanel.HTML_MARKUP =
  '<div id="pfdjs-pp-container">' +
  '  <div class="pfdjs-pp-tabs">' +
  '    <ul class="tab-sheets"></ul>' +
  '  </div>' +
  '  <div class="pfdjs-pp-contents">' +
  '  </div>' +
  '</div>';