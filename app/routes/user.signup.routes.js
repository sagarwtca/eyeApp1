var signupController = require('../controllers/user.signup.controller')
module.exports = function ( app ) {

app.post('/api/user/signup' , signupController.signup );
}