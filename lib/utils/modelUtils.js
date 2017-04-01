'use strict';

var getLocalName = require('d3-polytree/lib/utils/LocalName');

function is(definition, elementType){
  return getLocalName(definition) === elementType.toLowerCase();
}


module.exports = {
  is: is
};