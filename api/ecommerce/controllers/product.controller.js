const { v4: uuidv4 } = require('uuid')
const { Product, Attribute, ByProduct, Orders, DetailOrder } = require('../services/product.service')


module.exports = {
   getCategory: (req, res) => {
      Product.getCategory((error, data) => {
         if (error) {
            console.log(error)
            res.status(400).json({ error: error.name, message: "Get category fail." })
            return;
         }
         if (data.length) {
            const categories = data.map(e => e.category)
            res.status(200).json({ status: "success", categories })
         }
      })
   },
   getBrand: (req, res) => {
      const data = req.body.category?.length ? [...req.body.category] : []
      Product.getBrand(data, (error, data) => {
         if (error) {
            console.log(error)
            res.status(400).json({ error: error.name, message: "Get label fail." })
            return;
         }
         const brand = data.map(e => e.brand)
         res.status(200).json({ status: "success", brand })
      })
   },
   showAllByCategory: (req, res) => {
      const data = {
         category: req.body.category || [],
         sort: req.body.sort || 'price',
         order: req.body.order || 'asc',
         page: req.body.page ? req.body.page - 1 : 0,
         limit: req.body.limit || 10,
         brand: req.body.brand || []
      }
      Product.findAllByCategory(data, (error, data) => {
         if (error) {
            console.log(error)
            res.status(400).json({ error: error.name, message: "fail to load product." })
            return;
         }
         res.status(200).json({ status: "success", products: data })
      })
   },
   sreachByGroup: (req, res) => {
      const { product, data } = req.body;
      Product.searchInTable(product, data, (error, data) => {
         if (error) {
            res.status(400).json({ error: error.name, message: "fail to load product." })
            return;
         }
         res.status(200).json({ status: "success", products: data })
      })
   },
   updateAttrsProduct: (req, res) => {
      const { attrId } = req.body
      const data = new Attribute({
         id: attrId ? attrId : uuidv4(),
         productId: req.body.id,
         type: req.body.type,
         rating: req.body.rating,
         numReviews: req.body.numReviews
      })
      Product.updateAttrs(attrId, data, (error, result) => {
         if (error) {
            res.status(400).json({ error: error.name, message: "fail to upload product." })
            return;
         }
         res.status(201).json({ status: "success", message: "update attrs success." })
      })
   },
   detailProduct: (req, res) => {
      const { category, id } = req.params
      console.log(req.params)
      Product.getDetail(category, id, (error, data) => {
         if (error) {
            res.status(400).json({ error: error.name, message: "Fail to load detail product: " + error.sqlMessage })
            return;
         }
         if (data.length) {
            res.status(201).json({ status: "success", detail: data[0] })
         } else {
            res.status(201).json({ status: "success", message: "Product is not exist." })
         }
      })
   },
   Order: (req, res) => {
      const data = {
         detailOrder: [],
         order: {}
      }
      data.order = new Orders({
         id: uuidv4(),
         userId: req.body.userId || "f4922e10-7db8-4414-b41d-633577f9a884",
         totalPrice: req.body.totalPrice
      })
      for (i = 0; i < req.body.products.length; i++) {
         data.detailOrder.push(new DetailOrder({
            id: uuidv4(),
            orderId: data.order.id,
            productId: req.body.products[i].productId,
            quantity: req.body.products[i].quantity,
            price: req.body.products[i].price
         }))
      }

      Product.order(data, (error, data) => {
         if (error) {
            res.status(400).json({ error: error.name, message: "Fail to order: " + error.sqlMessage })
            return;
         }
         res.status(201).json({ status: "success", message: "Success to order." })
      })
   }
}

//updateAttrsProduct,sreachByGroup

