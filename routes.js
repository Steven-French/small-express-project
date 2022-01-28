const fetch = require('node-fetch');


module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('pages/index', {
			title: "Home | Small Project",
			active: 'home'
		});
	});
	
	app.get('/about', function(req, res) {
		res.render('pages/about', {
			title: "About | Small Project",
			active: 'about'
		});
	});

	app.get('/launches', function(req, res) {
		fetch('https://api.spacexdata.com/v4/launches/latest')
			.then(response => response.json())
			.catch(error => console.error(error))
			.then(data => {
				res.render('pages/launches', {
					title: "Launches | Small Project",
					launches: data,
					active: 'launches'
				});
			});
	});
}

