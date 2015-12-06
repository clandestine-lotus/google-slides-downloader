var should = require('chai').should();
var downloader = require('../index.js');

describe('the google slides downloader', function () {

    it('should have a get method', function (){
      googleSlidesDownloader.get.should.be.a('function');
    });

    it('should return an array of SVGs from the attached raw Google html', function () {
      var url = 'https://docs.google.com/presentation/d/1HsdP94BUaT2xCV3vjvu-3O9fiFfnTrNyKYRQTBUWnYY/embed';

      downloader.getHtml(url)
      .then(function (html) {
        
      });

    //   fs.readFile('./google-raw.html', 'utf8', function (err, doc) {
    //     var result = googleSlidesDownloader.get(doc);
    //     result.should.be.instanceof(Array);
    //     result.should.have.a.length.of(10);
    //     result[0].should.be.a('string');
    //     var startString = result[0].substr(0, 4);
    //     console.log(startString);
    //     result[0].substr(0, 4).should.equal('<s>');
    //   });
    // });

});
