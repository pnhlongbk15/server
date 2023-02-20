module.exports = app => {
        app.use('/api/ecommerce/',require('./auth.route'))
        app.use('/api/ecommerce/admin', require('./admin.route'));
        // app.use('/api/ecommerce/user', require('./user.route'))
        app.use('/api/ecommerce/products', require('./product.route'))
}