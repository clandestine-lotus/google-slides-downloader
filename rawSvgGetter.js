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
    if (collection.type === 'script') {
      result.push(collection);
    }
  }
  return result;
};

// fs.readFile('google-output.html', 'utf8', function (err, data) {
//   var dom = htmlparser.parseDOM(data);
//   var res = recurse(dom);
//   console.log(res);
// });

var testObj = [
  [
    {
      type: 'script',
      hello: 'abc',
      abi: 1
    },
    {
      type: 'script',
      hello: 'def',
      abi: 1
    },
  ],
  {
    type: 'somethignelse',
    hello: 'ghi',
    abi: 1
  },
  [
    {
      type: 'script',
      hello: 'jkl'
    }
  ]
];

var sth = recurse(testObj);
console.log(sth);
