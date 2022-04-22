const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

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

	app.get('/contact', function(req,res) {
		res.render('pages/contact', {
			title: "Contact | Small Project",
			active: 'contact'
		});
	});

	app.post('/contact', function(req,res) {
		var transport = nodemailer.createTransport({
			host: process.env.MAILHOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD
			}
		 });
		
		var mailOptions = {
			from: req.body.email,
			to: "steven.french88@gmail.com",
			subject: "Mail from Small Express Project",
			text: req.body.message,
			html: '<p style\"font-family: Arial, sans-serif;\">Message from: ' + req.body.name + '<br><br>' + 'Message:' + req.body.message + '</p>'
		};

		transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error(error);
			}
		})
	});
}


