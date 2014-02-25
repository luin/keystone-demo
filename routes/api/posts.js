var keystone = require('keystone');

exports = module.exports = function(req, res) {	
	var locals = res.locals;
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: []
	};

	console.log("req.params.category " + req.params.category);
	keystone.list('PostCategory').model.findOne({ key: req.params.category }).exec(function(err, result) {
		locals.data.category = result;
		console.log("locals.data.category1 " + locals.data.category);

		var q = keystone.list('Post').paginate({
		page: req.query.page || 1,
			perPage: 10,
			maxPages: 10
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author categories');

		console.log("locals.data.category2 " + locals.data.category);
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		};
		q.exec(function(err, results) {
			res.json(results);
		});
	});
}
