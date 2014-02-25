var keystone = require('keystone');

exports = module.exports = function(req, res) {
	keystone.list('PostCategory').model.find().exec(function(err, results) {
		
		res.json(results);
	});
}
