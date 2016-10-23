var db = require('../controllers/mongodb.js');
exports.getInfo = function (req, res) {
	var date = Number(req.params.date);
	var what = {modified_at:{ "$gt" : date }};
	db.find('productstest', what , function(err, success){
		console.log("success------",success);
		if(err) {
			res.send({
			error: 1,
			msg : 'failed to get gifts',
			data : []
			})
		}
		else{
			res.send({
				error: 0,
				msg :"success",
				data: success
			})
		}
	})
}