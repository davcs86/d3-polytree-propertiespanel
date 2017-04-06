'use strict';

require('empty-module');
var $ = require('jquery'),
    _get = require('lodash/object').get,
    _set = require('lodash/object').set;
require('spectrum-colorpicker');
require('spectrum-colorpicker/spectrum.css');

function ColorPickerEntryFactory(options, defaultParameters){
  var resource = defaultParameters,
      label = options.label || resource.id;

  resource.html =
    '<div class="pfdjs-pp-field-wrapper" >' +
    '<label for="pfdjs-' + resource.id + '" >'+ label +'</label>' +
    '<input id="pfdjs-' + resource.id + '" type="hidden" name="' + options.modelProperty+'" />' +
    '</div>';

  resource.get = function(element, formNode){
    $(formNode).find('input').spectrum({
      color: _get(element, options.modelProperty),
      showButtons: false,
      clickoutFiresChange: true
    });
  };

  return resource;
}

module.exports = ColorPickerEntryFactory;