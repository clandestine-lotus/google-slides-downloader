var fs = require('fs');
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
      if (svgScript.indexOf('\n  SK_svgData = \'') > -1) {
        var startIndex = svgScript.indexOf('\n  SK_svgData = \'') + 17;
        var endIndex = svgScript.indexOf(';', startIndex) - 1;
        var svgData = svgScript.substring(startIndex, endIndex);
        result.push(svgData);
      }
    }
    if (collection.children) {
      result = result.concat(recurse(collection.children));
    }
  }
  return result;
};

module.exports = function (googleOutput) {
  var dom = htmlparser.parseDOM(googleOutput);
  return recurse(dom);
}

// fs.readFile('google-output.html', 'utf8', function (err, data) {
//   var dom = htmlparser.parseDOM(data);
//   var res = recurse(dom);
//   console.log(res);
// });
