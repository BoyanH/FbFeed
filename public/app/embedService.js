app.factory("EmbedService", function ($location, $q) {


    return {

        normalizeLink: function (video) {

            if(video.application.name === 'YouTube') {

                var videoLink = video.link;
                indexOfV = videoLink.indexOf('/v/');

                video.embedLink = '//www.youtube.com/embed/' + videoLink.substring(indexOfV + 3, indexOfV + 14);

                return video
            }

            else if(video.application.name === 'Video') {

                var videoLink = video.link,
                indexOfV = videoLink.indexOf('v=');

                video.embedLink = 'http://www.facebook.com/v/' + videoLink.substring(indexOfV + 2);

                return video
            }
        }
    }
})