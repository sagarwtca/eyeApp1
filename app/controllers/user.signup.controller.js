var db = require('../controllers/mongodb.js');
exports.signup =  function(req, res ) {
	var obj ={
		"email" :req.body.email,
		"company" : req.body.company,
		"password" : req.body.password
	}
	db.find('user', {'email':req.body.email}, function(err, exist) {
		if(err) {
			
		}
		else {
			if(exist.length==0) {
				insertNewUser();
			} else {
					res.send({
					msg: "user already exists",
					error: 0
				})
			}
		}
	});
	function insertNewUser() {
		db.insert('user', obj, function(err, success){
			if(err) {
				res.send({
					msg: 'user not created',
					error :1,
				}) } else {
					res.send({
						error: 0,
						msg :"user created",
					})
				}
		})
	}
}