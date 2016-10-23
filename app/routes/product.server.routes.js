var productController = require('../controllers/product.server.controller')
module.exports = function ( app ) {

app.get('/api/product/getInfo/:date' , productController.getInfo );
}