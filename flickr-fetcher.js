var jQuery = require('jQuery');
var FlickerFetcher;

FlickerFetcher = {
    photoObjectToURL: function(input) {
        return `https://farm${input.farm}.staticflickr.com/${input.server}/${input.id}_${input.secret}_b.jpg`;
    },
    transformObj: function(input) {
        return {
            title: input.title,
            url: `https://farm${input.farm}.staticflickr.com/${input.server}/${input.id}_${input.secret}_b.jpg`
        }
    },
    fetchFlickrData: function(apiKey,fetch){
        if ((!fetch) && (typeof jQuery !== 'undefined')) {
            fetch = jQuery.getJSON.bind(jQuery);
       };
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
            + apiKey.toString() + '&text=pugs&format=json&nojsoncallback=1';
        return fetch(url);
    },
    fetchPhoto: function(apiKey,fetch){
        return FlickerFetcher.fetchFlickrData(apiKey,fetch).then(function(data){
            return data.photos.photo.map(FlickerFetcher.transformObj);
        });
    }
}

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = FlickrFetcher;
}