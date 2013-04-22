var url = require('url');
var winston = require('winston');

module.exports = function(req, res, next){

	// Couldn't get this to work...the host
	// shows as www.smallhq.com even when
	// smallhq.com is accessed raw.
  winston.log('info', req.header('host'));
	if (req.header("host") == 'hookfeed.com') {
		res.redirect(301, 'http://www.hookfeed.com'+req.path);
	} else {
		next();
	}
};