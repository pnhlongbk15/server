
module.exports = app => {
        app.use('/api/ecommerce/',require('./auth.route'));
        app.use('/api/ecommerce/products', require('./product.route'))
}