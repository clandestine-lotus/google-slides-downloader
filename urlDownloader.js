var rp = require('request-promise');
var downloader = require('./index');
var fs = require('fs');

var url = 'https://docs.google.com/presentation/d/1n0SGmbgLATN0bj-K_oEerH0BaFb4HrzSGGIo5u7XyZE/embed';

downloader.getHtml(url)
.then(function (body) {
  console.log(body);
  var result = downloader.convert(body);
  console.log(result);
  result.forEach(function (el, i) {
    fs.writeFile('slide' + i + '.svg', el, function () {
      console.log('saved');
    });
  });
});

// exports = function (url) {
//   return rp(url);
// };

// exports(url)
// .then(function (body) {
//   console.log(body);
// });

// exports.get = function (url) {
//   return new Promise(function (resolve, reject) {
//     https.get(url, function (res) {
//       var body = '';
//       res.on('data', function (chunk) {
//         body += chunk;
//       });
//       res.on('end', function () {

//       });
//     });
//   });
// };
