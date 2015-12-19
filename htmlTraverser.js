var _ = require('underscore');

// takes in a collection returned from htmlparser.parseDOM, which creates an object for each DOM element
// searches each object for a 'script' tag
// if it has one it looks in the first element in the object's 'children' value (which is an array with only one element)
// and looks for 'SK_SVGData = \'' which is where the svg data is
// grabs the SVG data, converts it to the correct format using eval, and adds it to the results array
// when done it returns the results array
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

module.exports = recurse;
