'use strict';

var forIn = require('lodash/object').forIn
    ;

function ModellingHelper(){

}

ModellingHelper.prototype.updateProperties = function(element, valuesObj){
  forIn(valuesObj, function(v, k){
    element[k] = v;
  });
};

module.exports = ModellingHelper;