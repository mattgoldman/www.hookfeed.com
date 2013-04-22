var fs = require('fs');

module.exports = function(req, res){
	var redirect = true;

	if (req.url == '/path_to_redirect') {
  	var destination = '/path_bla_or_full_url'
  }else if (req.url == '/funny_bunnies'){
  	var destination = '/path_or_full_url'
  } else {
	  redirect = false;

  	// Show 404 error
    fs.readFile(__dirname + '/public/404.html', 'utf8', function(err, html){
	    res.send(404, html);
	  });
  }

  // Redirect to destination if not 404
	if (redirect == true){
		res.writeHead(301, {
  		'Location': destination,
  		'Expires': (new Date).toGMTString()
  	});
	  res.end();
	}
};