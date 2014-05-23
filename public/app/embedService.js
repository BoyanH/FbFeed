app.factory("EmbedService", function ($location, $q) {


    return {

        normalizeLink: function (video) {

            if(video.application) {

                if(video.application.name === 'YouTube') {

                    var videoLink = video.source,
                        indexOfV = videoLink.indexOf('/v/');

                    video.embedLink = '//www.youtube.com/embed/' + videoLink.substring(indexOfV + 3, indexOfV + 14);

                    return video
                }

                else if(video.application.name === 'Video') {

                    var videoLink = video.link,
                        indexOfV = videoLink.indexOf('v=');

                    video.embedLink = 'http://www.facebook.com/video/embed?video_id=' + videoLink.substring(indexOfV + 2);

                    return video
                }
            }

            else if(video.source.substring(0, 23) == 'http://www.youtube.com/') {

                var videoLink = video.source,
                    indexOfV = videoLink.indexOf('/v/');

                video.embedLink = '//www.youtube.com/embed/' + videoLink.substring(indexOfV + 3, indexOfV + 14);

                return video
            }

            else if(video.source.substring(0, 25) == 'http://www.vbox7.com/') {

                var videoLink = video.link,
                    indexOfY = videoLink.indexOf('y:');

                video.embedLink = 'http://vbox7.com/emb/external.php?vid=' + videoLink.substring(indexOfY + 2);

                return video
            }

            else if(video.link.substring(0, 20) == 'https://www.facebook') {

                var videoLink = video.link,
                    indexOfV = videoLink.indexOf('v=');

                video.embedLink = 'http://www.facebook.com/video/embed?video_id=' + videoLink.substring(indexOfV + 2);

                return video
            }
                else {

                    return video
                }
        }
    }
})