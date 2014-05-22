app.factory( 'PopupService', function () {
    
    return {
        share: function (item) {

        	if(item.link.substring(0, 25) == 'https://www.facebook.com/') {

        		item.picture = 'https://images.weserv.nl/?url=' + item.postPhoto.substring(8);
        		item.link = item.postPhoto;

        		FB.ui(
					  {
					    method: 'share',
					    href: item.link,
					    picture: item.picture
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
	        	else {

	        		console.log(item);
		        	FB.ui(
					  {
					    method: 'share',
					    href: item.link,
					    picture: item.picture
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
    }
});