//Showing a full size image
document.addEventListener('DOMContentLoaded', function() {
    var $_GET = {};
    if(document.location.toString().indexOf('?') !== -1) {
	var query = document.location
	    .toString()
	// get the query string
	    .replace(/^.*?\?/, '')
	// and remove any existing hash string
	    .replace(/#.*$/, '')
	    .split('&');

	for(var i=0, l=query.length; i<l; i++) {
	    var aux = decodeURIComponent(query[i]).split('=');
	    $_GET[aux[0]] = aux[1];
	}
    }
    showimg.innerHTML="<img src=\"/img/"+$_GET['img']+'\">';
  },false);
