var downloader = require('./index');
var fs = require('fs');

var url = 'https://docs.google.com/presentation/d/1n0SGmbgLATN0bj-K_oEerH0BaFb4HrzSGGIo5u7XyZE/embed';

downloader.getSVGs(url)
.then(function (arr) {
  arr.forEach(function (el, i) {
    fs.writeFile('slide' + i + '.svg', el, function () {
      console.log('saved');
    });
  });
});
