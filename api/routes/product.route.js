const productRoute = require('express').Router();

const product = require('../controllers/product.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// get all product
productRoute.post('/show-all', product.showAllByCategory)
//
productRoute.get('/search/:filter/:value', product.sreachByGroup)
//
productRoute.post('/update-attrs', product.updateAttrsProduct)
//get detail
productRoute.get('/:category/:id', product.detailProduct)
//get category
productRoute.get('/categories', product.getCategory)
//get brand
productRoute.post('/brand', product.getBrand)
//order product
productRoute.post('/order', product.Order)
// productRoute.post('/order', product.getBrand)

// productRoute.post('/update', authMiddleware.isAdmin, admin.updateProduct)


module.exports = productRoute;