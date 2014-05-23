app.factory( 'ButtonsFacebookService', function () {
    
    return {
        share: function (item) {

        	if(item.link.substring(0, 25) == 'https://www.facebook.com/' && item.type == 'photo') {

        		item.picture = 'https://images.weserv.nl/?url=' + item.postPhoto.substring(8);
        		item.link = item.picture;
        	}

    		console.log(item);
        	FB.ui(
			  {
			    method: 'share',
			    href: item.link,
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

        }
    }
});