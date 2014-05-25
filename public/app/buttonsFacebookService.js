﻿app.factory( 'ButtonsFacebookService', function () {
    
    return {
        share: function (item) {

        	if(item.link) {

        		if(item.link.substring(0, 25) == 'https://www.facebook.com/' && item.type == 'photo') {

	        		item.picture = 'https://images.weserv.nl/?url=' + item.postPhoto.substring(8);
	        		item.link = item.picture;
	        	}
        	}

    		console.log(item);
        	FB.ui(
			  {
			    method: 'share',
			    href: item.link || 'https://www.youtube.com/watch?v=Et58G1DR3YY&feature=player_detailpage',
			    picture: item.picture,
			    caption: item.caption,
			    name: item.name,
			    status_type: item.status_type,
			    type: item.type,
			    description: item.description
			  },
			  function(response) {
			    if (response && !response.error_code) {
			      alert('Posting completed.');
			    } else {
			      alert('Error while posting.');
			    }
			  }
			);
        },
        like: function (item) {

        	FB.api( 'https://graph.facebook.com/' + item.id + '/likes',
        			'post', null,
	        	function (response) {
	        		if (response && !response.error_code) {
				      alert('Like completed.');
				    } else {
				      alert('Error while liking.');
				    }
	        	});
        },
        comment: function (item) {

        	FB.api( 'https://graph.facebook.com/' + item.id + '/comments', 'post', 
        	{
        		message: item.userMessage
        	},  function (response) {
	        		if (response && !response.error_code) {
				      alert('You posted comment.');
				    } else {
				      alert('Error while commenting.');
				    }
	        	});
        }
    }
});