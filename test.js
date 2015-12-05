var fs = require('fs');
var getSvgs = require('./svgGetter');

fs.readFile('google-output.html', 'utf8', function (err, data) {
  var svgs = getSvgs(data);
  svgs.forEach(function (svg, index) {
    fs.writeFile('output' + index + '.svg', svg, function (err) {
      if (err) throw err;
      console.log('saved');
    });
  });
});
