const { v4: uuidv4 } = require('uuid')
const User = require('../services/user.service')
const Token = require('../services/token.service')
const passwordUtil = require('../utils/password')
const tokenUtil = require('../utils/token')


module.exports = {
   showLoginForm: (req, res) => {
      // res.render('auth/login.ejs', {
      //    layout: false
      // })
      res.render('upload/form.ejs',{
            layout: false
      })
   },
   upload: (req,res) => {
      const image = req.file
      console.log(req.body.imageTest)
      console.log('image',image)
   },
   showHome: (req, res) => {
      res.render('products/home.ejs')
   },
   login: (req, res) => {
      if (res.locals?.check && res.locals?.check.isAdmin) {
         const hash = res.locals.check.password
         const userId = res.locals.check.id

         passwordUtil.verify(req.body.password, hash)
            .then(result => {
               if (result) {
                  const accessToken = tokenUtil.generateAccessToken(res.locals.check);
                  const refreshToken = tokenUtil.generateRefreshToken(res.locals.check);

                  const token = new Token({
                     id: uuidv4(),
                     value: refreshToken,
                     userId: userId
                  })
                  tokenUtil.checkRefreshToken(userId).then(isValid => {
                     if (isValid) {
                        tokenUtil.storeRefreshToken(token).then(result => {
                           if (result.status == 'success') {
                              res.cookie('refreshToken', refreshToken, {
                                 httpOnly: true,
                                 secure: false,
                                 path: '/',
                                 sameSite: 'strict'
                              });
                              req.session.accessToken = `Bearer ${accessToken}`;
                              res.redirect('/api/ecommerce/admin/home');
                           }
                        })
                     } else {
                        res.locals.response = { status: 'fail', message: 'login unsuccesful.' };
                     }
                  }).catch(error => {
                     res.status(400).json({ error: error.message });
                  })
               } else {
                  res.locals.response = { status: 'fail', message: 'incorrect password' }
               }
            }).catch(error => {
               res.status(400).json({ error: error.message });
            })
      } else {
         res.locals.response = { status: 'fail', message: "user doesn't exists." };
      }
   },
   showProducts: (req, res) => {
      res.render('products/product.ejs')
   },
   updateProduct: (req, res) => {
      Product.find({ name: req.body.name }, (error, data) => {
         if (error) {
            res.status(400).json({ error: error.name, message: "search product fail." })
         }
         if (data?.length) {
            // có product trong dtbase thì nó sẽ gửi thông tin sản phẩm ra
            res.render('products/product.ejs', {
               name: data[0].name,
               price: data[0].price,
               countInStock: data[0].countInStock,
               message: 'product already exist.'
            })
         } else {
            // không có thì sẽ update
            // them brand cho view admin
            const product = new Product({
               id: uuidv4(),
               name: req.body.name,
               brand: req.body.brand,
               description: req.body.description,
               price: req.body.price,
               countInStock: req.body.countInStock,
               link: req.body.link
            })
            Product.create(product, (error, data) => {
               if (error) {
                  res.status(400).json({ error: error.name, message: "update fail." })
               }
               res.render('products/product.ejs', { message: data.message })
            })
         }
      })
   }
}