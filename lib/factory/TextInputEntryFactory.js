'use strict';

function TextInputEntryFactory(options, defaultParameters){
  var resource = defaultParameters,
      label = options.label || resource.id,
      type = options.type || 'text';

  resource.html =
    '<div class="pfdjs-pp-field-wrapper" >' +
    '<label for="pfdjs-' + resource.id + '" >'+ label +'</label>' +
    '<input id="pfdjs-' + resource.id + '" type="' + type + '" name="' + options.modelProperty+'" />' +
    '</div>';

  return resource;
}

module.exports = TextInputEntryFactory;