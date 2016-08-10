var expect =require('chai').expect,
    PhotoLister = require('./photo-lister.js');
var cheerio = require('cheerio');

describe('Photo Lister',function(){
    it('should exist',function(){
        expect(PhotoLister).not.to.be.undefined;
    });
});

describe('#photoListAlbum',function(){
    it('should take photo object and return list string',function(){
        var input = {
                title: 'This is a test',
                url:   'http://loremflickr.com/960/593'
            },
            expected = `<li><figure><img src="http://loremflickr.com/960/593" alt=""/><figcaption>This is a test</figcaption></figure></li>`;
            expect(PhotoLister.photoToListItem(input)).to.equal(expected);
    });

    it('should take array of photo object and make a list',function(){
        var input = [{
                title: 'This is a test',
                url:   'http://loremflickr.com/960/593'
            }, {
                title: 'This is another test',
                url:   'http://loremflickr.com/960/593/puppy'
            }],
            expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
                     + '<figcaption>This is a test</figcaption></figure></li>'
                     + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
                     + '<figcaption>This is another test</figcaption></figure></li></ul>';
            expect(PhotoLister.photoListToHTML(input)).to.equal(expected);
    });
});

describe('#addPhotosToElement',function(){
    it('should take an HTML string of list items and add them to an element with a given selector',function(){
        var $ = cheerio.load('<html><head></head><body><div id="myDiv"></div></body></html>');
        var list     = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
                     + '<figcaption>This is a test</figcaption></figure></li>'
                     + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
                     + '<figcaption>This is another test</figcaption></figure></li></ul>';
        var selector = '#myDiv';
         var $div = PhotoLister.addPhotosToElement($,selector,list);
         expect($div.find('ul').length).to.equal(1);
         expect($div.find('li').length).to.equal(2);
         expect($div.find('figure').length).to.equal(2);
        expect($div.find('img').length).to.equal(2);
        expect($div.find('figcaption').length).to.equal(2);
    });
});