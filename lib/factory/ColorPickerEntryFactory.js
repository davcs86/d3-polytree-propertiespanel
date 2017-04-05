'use strict';

require('color-picker');
var colorPicker = window.CP;

function ColorPickerEntryFactory(options, defaultParameters){
  var resource = defaultParameters,
      label = options.label || resource.id;

  resource.html =
    '<div class="pfdjs-pp-field-wrapper" >' +
    '<label for="pfdjs-' + resource.id + '" >'+ label +'</label>' +
    '<input id="pfdjs-' + resource.id + '" type="hidden" name="' + options.modelProperty+'" />' +
    '</div>';

  console.log(colorPicker);

  return resource;
}

module.exports = ColorPickerEntryFactory;