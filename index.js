var rp = require('request-promise');
var htmlparser = require("htmlparser2");
var _ = require('underscore');

var recurse = function (collection) {
  var result = [];
  if (Array.isArray(collection)) {
    _.each(collection, function (element) {
      result = result.concat(recurse(element));
    });
  } else {
    if (collection.type === 'script' && collection.children[0] && collection.children[0].data) {
      var svgScript = collection.children[0].data;
      // 'SK_svgData = \'';
      // '\n  SK_svgData = \'';
      if (svgScript.indexOf('SK_svgData = \'') > -1) {
        var startIndex = svgScript.indexOf('SK_svgData = \'') + 14;
        var endIndex = svgScript.indexOf(';', startIndex) - 1;
        var svgData = svgScript.substring(startIndex, endIndex);
        var svg = eval('"' + svgData + '"');
        result.push(svg);
      }
    }
    if (collection.children) {
      result = result.concat(recurse(collection.children));
    }
  }
  return result;
};

module.exports = {
  // async function to returns a promise
  getHtml: function (url) {
    return rp(url);
  },

  convert: function (rawHtml) {
    var dom = htmlparser.parseDOM(rawHtml);
    return recurse(dom);
  },

  // async function so returns a promise
  get: function (url) {
    return new Promise(function (resolve, reject) {
      return module.exports.getHtml(url)
      .then(function (rawHtml) {
        var result = module.exports.convert(rawHtml);
        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
    });
  }
};
