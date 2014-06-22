app.factory( 'ButtonsFacebookService', function ($q) {
    
    return {
        share: function (item) {
        	var deferred = $q.defer();
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
			      deferred.resolve(true);
			    } else {
			      deferred.resolve(false);
			      alert('Error while posting.');
			    }
			  });
        	return deferred.promise;

        },
        like: function (item) {
        	var deferred = $q.defer();
        	FB.api( 'https://graph.facebook.com/' + item.id + '/likes',
        			'post', null,
	        	function (response) {
	        		if (response && !response.error_code) {
				      //alert('Like completed.');
				      deferred.resolve(true);
				    } else {
				    	deferred.resolve(false);
				      alert('Error while liking.');
				    }
	        	});
        	return deferred.promise;
        },
        comment: function (item) {
        	var deferred = $q.defer();
        	FB.api( 'https://graph.facebook.com/' + item.id + '/comments', 'post', 
        	{
        		message: item.userMessage
        	},  function (response) {
	        		if (response && !response.error_code) {
				      alert('You posted comment.');
				      deferred.resolve(true);
				    } else {
				      alert('Error while commenting.');
				      deferred.resolve(false);
				    }
	        	});
        	return deferred.promise;
        }
    }
});