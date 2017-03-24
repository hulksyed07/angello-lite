var Status = require('../models/StatusModel.js');

module.exports = function(app){
	app.get('/api/statuses', function(req, res){
		Status.find(function(err, statuses){
			if (err)
				res.send(err);

			res.json(statuses);
		});
	});

	app.post('/api/statuses', function(req, res){
		Status.create(req.body, function(err, status){
			if (err)
				res.send(err);

			Status.find(function(err, statuses){
				if (err)
					res.send(err);

				res.json(statuses);
			})
		});
	});

	app.put('/api/statuses/:status_id', function(req, res){
		Status.update({ _id: req.params.status_id}, req.body, function(err, status){
			if (err)
				res.send(err);

			Status.find(function(err, statuses){
				if (err)
					res.send(err);

				res.json(statuses);
			})
		});
	});

	app.delete('/api/statuses/:status_id', function(req, res){
		Status.remove({ _id: req.params.status_id}, function(err, status){
			if (err)
				res.send(err);

			Status.find(function(err, statuses){
				if (err)
					res.send(err);

				res.json(statuses);
			})
		});
	});
}