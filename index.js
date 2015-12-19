var rp = require('request-promise');
var htmlparser = require("htmlparser2");
var traverse = require('./htmlTraverser');

module.exports = {
  // returns a promise that when resolved gives the raw html from a url
  getHtml: function (url) {
    return rp(url);
  },

  // takes a string of raw html
  // converts it to a collection using htmlparser
  // and traverses the collection and gets the SVG elements from it using the htmlTraverser
  // returns array of SVGs
  // not async so simply returns result
  convert: function (rawHtml) {
    var dom = htmlparser.parseDOM(rawHtml);
    return traverse(dom);
  },

  // takes a URL
  // returns a promise that when resolves gives an array of the SVGs on that URL location
  getSVGs: function (url) {
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
