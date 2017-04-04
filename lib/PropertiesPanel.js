'use strict';

var forEach = require('lodash/collection').forEach,
  isFunction = require('lodash/lang').isFunction,
  isUndefined = require('lodash/lang').isUndefined,
  toSafeInteger = require('lodash/lang').toSafeInteger,
  domify = require('min-dom/lib/domify'),
  domQuery = require('min-dom/lib/query'),
  domAttr = require('min-dom/lib/attr'),
  domClear = require('min-dom/lib/clear'),
  scrollTabs = require('scroll-tabs'),
  domClasses = require('min-dom/lib/classes'),
  domDelegate = require('min-dom/lib/delegate')
;

require('./style/style.scss');

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
  this._registerSelectionListener();
};

PropertiesPanel.prototype._registerSelectionListener = function(){
  var that = this;
  this._eventBus.on('selection.changed', function(oldSelection, newSelection){
    var selected = null;
    if (newSelection.length === 1 && (oldSelection.length !== 1 || oldSelection[0].definition.id !== newSelection[0].definition.id)){
      selected = newSelection[0].definition;
    }
    that._update(selected);
  });
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

PropertiesPanel.prototype._selectTab = function(tabId){
  var allTabs = domQuery.all('.tab-sheet', this._scrolltabsTabs);
  forEach(allTabs, function(t){
    domClasses(t).remove('tab-sheet-active');
  });
  var activeTab = domQuery('[data-tab-target="' + tabId + '"]', this._scrolltabsTabs);
  domClasses(activeTab).add('tab-sheet-active');
};

PropertiesPanel.prototype._drawPanel = function(content){
  //
  this._drawContainer(content);
};

PropertiesPanel.prototype._drawContainer = function(content){
  //
  var that = this;
  this._scrolltabsContainer = domify(PropertiesPanel.HTML_MARKUP);

  content.insertBefore(this._scrolltabsContainer, content.childNodes[0]);

  this._scrolltabsEntries = domQuery('.pfdjs-pp-tabs', this._scrolltabsContainer);
  this._scrolltabsTabs = domQuery('.tab-sheets', this._scrolltabsEntries);
  this._scrolltabsContents = domQuery('.pfdjs-pp-contents', this._scrolltabsContainer);

  domDelegate.bind(this._scrolltabsContainer, '.tab-sheet', 'click', function (event) {
    var tabId = domAttr(event.delegateTarget, 'data-tab-target');
    that._selectTab(tabId);
    event.stopImmediatePropagation();
  });

};

PropertiesPanel.prototype._update = function(definition){
  //
  if (this._scrolltabsEntries) {
    domClear(this._scrolltabsTabs);
    domClear(this._scrolltabsContents);
  }
  if (definition) {
    this._drawEntries(definition);
  }
};

PropertiesPanel.prototype._drawEntries = function(definition){
  console.log(this._propertiesProvider);
  var that = this,
      tabs = this._propertiesProvider.getTabs(definition);
  // draw the contents

  // draw the tabs
  var firstTab = null;
  forEach(tabs, function(t){
    if (!firstTab){
      firstTab = t.id;
    }
    var tab = domify('<li class="tab-sheet" data-tab-target="'+t.id+'">'+
      '<a href="#">'+t.label+'</a>'+
      '</li>');
    that._scrolltabsTabs.appendChild(tab);
  });
  var scTabs = new scrollTabs(
    this._scrolltabsEntries,
    {
      selectors: {
        tabsContainer: ".tab-sheets",
        tab: ".tab-sheet",
        ignore: ".tab-sheet-ignore",
        active: ".tab-sheet-active"
      }
    }
  );

  scTabs.on('scroll', function(newActiveTab){
    var tabId = domAttr(newActiveTab, 'data-tab-target');
    that._selectTab(tabId);
  });

  this._selectTab(firstTab);

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