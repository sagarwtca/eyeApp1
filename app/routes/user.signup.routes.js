var signupController = require('../controllers/user.signup.controller')
var loginApiController = require('../controllers/user.loginApi.controller');
module.exports = function ( app ) {

app.post('/api/user/signup' , signupController.signup);

app.post('/api/user/login' , loginApiController.loginApi);

}

