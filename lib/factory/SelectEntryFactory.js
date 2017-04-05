'use strict';

var forEach = require('lodash/collection').forEach,
    domQuery = require('min-dom/lib/query'),
    domAttr = require('min-dom/lib/attr'),
    isUndefined = require('lodash/lang').isUndefined;

var isList = function(list) {
  return !(!list || Object.prototype.toString.call(list) !== '[object Array]');
};

var addEmptyParameter = function(list, concat) {
  if (concat){
    list = list.concat([{ name: '', value: '' }]);
  }
  return list;
};

function SelectEntryFactory(options, defaultParameters){
  var resource = defaultParameters,
      label = options.label || resource.id,
      allowEmpty = isUndefined(options.allowEmpty)? true : options.allowEmpty,
      selectOptions = (isList(options.selectOptions)) ? addEmptyParameter(options.selectOptions, allowEmpty)
        : [ { name: '', value: '' }],
      modelProperty = options.modelProperty;

  resource.html =
    '<div class="pfdjs-pp-field-wrapper" >' +
    '<label for="pfdjs-' + resource.id + '" >'+ label +'</label>' +
    '<select id="pfdjs-' + resource.id + '" name="' + modelProperty+'" >';

  forEach(selectOptions, function(option){
    resource.html += '<option value="' + option.value + '">' + option.name + '</option>';
  });

  resource.html += '</select></div>';

  resource.get = function(element, propertyNode) {
    var boValue = element.get(modelProperty) || 'default',
        elementFields = domQuery.all('select#pfdjs-' + resource.id + ' > option', propertyNode);

    forEach(elementFields, function(field) {
      if(field.value === boValue) {
        domAttr(field, 'selected', 'selected');
      } else {
        domAttr(field, 'selected', null);
      }
    });
  };

  return resource;
}

module.exports = SelectEntryFactory;