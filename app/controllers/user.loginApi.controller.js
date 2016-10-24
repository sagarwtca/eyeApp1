
var db = require('../controllers/mongodb.js');

exports.loginApi = function (req, res) {
    var obj ={
		"email" :req.body.email,
		"password" : req.body.password
	}
   

db.find('usertest', obj , function(err, success){
    console.log(success);
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
			    })
            }
            else {
                res.send({
                    error: 0,
                    msg :"success",
                })
            }
		}
	})

}