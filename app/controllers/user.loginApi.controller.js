var jwt = require('jwt-simple');
var db = require('../controllers/mongodb.js');
var config = require('../config/config');
exports.loginApi = function (req, res) {
    var obj ={
		"email" :req.body.email,
		"password" : req.body.password
	}
  
db.find('usertest', obj , function(err, success){
		if(err) {
			res.send({
			error: 1,
			msg : 'error',
			data : []
			})
		}
		else{
			if(!success.length) {
                res.send({
			        error: 0,
			        msg : 'user not found',
                    data : success
			    })
            }
            else {
				var payload = success[0];
				var secret = config.secret;
				var token = jwt.encode(payload, secret);
                res.send({
                    error: 0,
                    msg :"success",
                    data : success[0],
					token : token
                })
            }
		}
	})

}