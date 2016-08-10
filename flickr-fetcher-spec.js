'use strict';
var expect = require('chai').expect;
var FlickrFetcher = require('./flickr-fetcher.js');

describe('FlickFeacher', function() {
   it('should exist',function() {
       var FlickerFetcher = require('./flickr-fetcher.js');
       expect(FlickerFetcher).to.not.be.undefined;
   }); 
});

describe('#transformPhotoObj',function() {
   it('should take input object and return obj with only title and url',function () {
         var input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    'Whats up babe',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        var expected = {
            title:    'Whats up babe',
            url: FlickrFetcher.photoObjectToURL(input)
        };
        var actual = FlickrFetcher.transformObj(input);
        expect(actual).to.eql(expected);
   }); 
});

describe('#photoObjectToURL',function(){
    it('should take a object from flicker and make expected url',function() {
         var input = {
            id:       '24770505034',
            owner:    '97248275@N03',
            secret:   '31a9986429',
            server:   '1577',
            farm:     2,
            title:    '20160229090898',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        var expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
        var actual = FlickrFetcher.photoObjectToURL(input);
        expect(actual).to.eql(expected);
    });
});

describe('#fetchFlickerData',function(){
    it('should take api key and fetch and return promise for JSON',function(){
        var apiKey      = 'does not matter much what this is right now',
            expected = [{
                    title: 'Dog goes to desperate measure to avoid walking on a leash',
                    url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
                }, {
                    title: 'the other cate',
                    url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
                }],
            fakeData = {
                'photos': {
                    'page':    1,
                    'pages':   2872,
                    'perpage': 100,
                    'total':   '287170',
                    'photo':   [{
                        id:       '25373736106',
                        owner:    '99117316@N03',
                        secret:   '146731fcb7',
                        server:   '1669',
                        farm:     2,
                        title:    'Dog goes to desperate measure to avoid walking on a leash',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    }, {
                        id:       '24765033584',
                        owner:    '27294864@N02',
                        secret:   '3c190c104e',
                        server:   '1514',
                        farm:     2,
                        title:    'the other cate',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    }]
                }
            },
        fakeFetcher = function(url){
            var expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                                + apiKey + '&text=pugs&format=json&nojsoncallback=1';
            expect(url).to.equal(expectedURL);
            return Promise.resolve(fakeData);
        };
        return FlickrFetcher.fetchPhoto(apiKey,fakeFetcher).then(function(actual){
            expect(actual).to.eql(expected);
        });
    });
})