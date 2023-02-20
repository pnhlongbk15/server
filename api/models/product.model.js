
const Product = function (product) {
        this.productId = product.productId;
        this.title = product.title;
        this.price = product.price;
        this.category = product.category;
        this.allInStock = product.countInStock;
        this.image = product.image;
        this.attrId = product.attrId;
        this.byProductId = product.byProductId;
}

const Attribute = function (attr) {
        this.attrId = attr.attrId;
        this.productId = attr.productId;
        this.category = attr.category;
        this.brand = attr.brand;
        this.description = attr.description;
        this.rating = attr.rating;
        this.numReviews = attr.numReviews;
}

const ByProduct = function (byProduct) {
        this.byProductId = byProduct.byProductId;
        this.category = byProduct.category;
        this.size = byProduct.size;
        this.color = byProduct.color;
        this.inStock = byProduct.inStock;
}

const Orders = function (order) {
        this.id = order.id;
        this.userId = order.userId; // lay o token
        this.totalPrice = order.totalPrice;
}

const DetailOrder = function (detail) {
        this.detailId = detail.detailId;
        this.orderId = detail.orderId; // lay o order
        this.productId = detail.productId;
        this.quantity = detail.quantity;
        this.price = detail.price;
}

module.exports = { Product, Attribute, ByProduct, Orders, DetailOrder };