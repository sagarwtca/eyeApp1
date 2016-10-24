
var db = require('../controllers/mongodb.js');

exports.loginApi = function (req, res) {
    var obj ={
		"email" :req.body.email,
		"password" : req.body.password
	}
   

db.find('user', obj , function(err, success){
		if(err) {
			res.send({
			error: 1,
			msg : 'error',
			data : []
			})
		}
		else{
			res.send({
				error: 0,
				msg :"success",
			})
		}
	})

}