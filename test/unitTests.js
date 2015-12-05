var should = require('chai').should();
var googleSlidesDownloader = require('../index.js');

describe('the google slides downloader', function () {

    it('should have a get method', function (){
      googleSlidesDownloader.get.should.be.a('function');
    });

});
