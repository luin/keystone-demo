var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	keystone.list('User').model.find().exec(function(err, results) {
		
		var users = results.map(function(i) {
			return {
				first_name: i.name.first,
				last_name: i.name.last,
				email: i.email
			}
		});
		
		res.json(users);
	});
	
}
