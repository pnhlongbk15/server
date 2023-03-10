const { Attribute, Product, ByProduct, Orders, DetailOrder } = require('../models/product.model')

const sql = require('../configs/db.connection');


Product.getCategory = (cb) => {
   sql.query('SELECT DISTINCT category FROM Product', (error, result) => {
      if (error) {
         console.log(error)
         cb(error, null);
         return;
      }
      cb(null, result)
   })
}
Product.getBrand = (data, cb) => {
   let statement = 'SELECT DISTINCT brand FROM Attribute'

   if (data.length) {
      statement = statement + ' ' + 'WHERE'
      for (i = 0; i < data.length; i++) {
         if (data.length - 1 === i) {
            statement = statement + ' ' + `category='${data[i]}'`
            continue;
         }
         statement = statement + ' ' + `category='${data[i]}' or`
      }
   }

   sql.query(statement, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      // console.log(result)
      cb(null, result)
   })
}
Product.create = (product, data, cb) => {
   sql.query(`INSERT INTO ${product} SET ?`, data, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, { message: 'update product success.' })
      } else {
         cb(null, { message: 'update product fail.' })
      }
   })
}

Product.searchInTable = (product, data, cb) => {
   const { filter, value } = data;

   sql.query(`SELECT * FROM ${product} WHERE ${filter} LIKE '%${value}%' `, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      cb(null, result);
   })
}

Product.findAllByCategory = (data, cb) => {
   let statement = `  
                        SELECT p.productId, p.title, p.price, p.image, p.category, a.rating, a.brand
                        FROM Product as p
                        LEFT JOIN Attribute as a
                        ON p.attrId = a.attrId  
                        ORDER BY ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.page * data.limit} 
                        `
   if (data.category?.length) {
      const wrap = (statement, category) => {
         let query = `SELECT * From (${statement}) as t WHERE`
         for (i = 0; i < category.length; i++) {
            if (i === category.length - 1) {
               query = query + ' ' + 't.category =' + ' ' + `'${category[i]}'`;
               continue;
            }
            query = query + ' ' + 't.category =' + ' ' + `'${category[i]}'` + ' ' + 'or';
         }
         console.log(query)
         return query
      }
      statement = wrap(statement, data.category)
   }
   if (data.brand?.length) {
      const wrap = (statement, brand) => {
         let query = `SELECT * From (${statement}) as t WHERE`
         console.log(brand)
         for (i = 0; i < brand.length; i++) {
            if (i === brand.length - 1) {
               console.log(i)
               query = query + ' ' + 't.brand =' + ' ' + `'${brand[i]}'`;
               continue;
            }
            query = query + ' ' + 't.brand =' + ' ' + `'${brand[i]}'` + ' ' + 'or';
         }
         console.log(query)
         return query
      }
      statement = wrap(statement, data.brand)
   }

   sql.query(statement, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      cb(null, result);
   })
}

Product.getDetail = (category, id, cb) => {
   const statement = `  SELECT * FROM Product as p, Attribute as a
                        WHERE p.productId = '${id}'
                        AND p.category = '${category}'
                        AND p.attrId = a.attrId `
   console.log(statement)
   sql.query(statement, (error, result) => {
      if (error) {
         cb(error, null)
         return;
      }

      cb(null, result)
   })
}

Product.drop = (product, data, cb) => {
   sql.query(`DELETE FROM ${product} WHERE ?`, data, (error, result) => {
      if (error) {
         cb(error, null)
      }
      if (result.affectedRows > 0) {
         cb(null, { status: 'success', items: result.affectedRows })
      } else {
         cb(null, { message: 'No item' })
      }
   })
}

Product.updateAttrs = (attrId, data, cb) => {
   const statement = attrId ? `UPDATE Attribute SET ?` : `INSERT INTO Attribute SET ? `
   console.log(data, statement)
   sql.query(statement, data, (error, result) => {
      console.log(error)
      if (error) {
         cb(error, null)
      }
      if (result.affectedRows > 0) {
         if (attrId) {
            cb(error, { status: 'success', message: 'update success!' })
         } else {
            sql.query(`UPDATE ${data.type} SET attrId = '${data.id}' WHERE (id= '${data.productId}')`, (error, result) => {
               if (error) {
                  cb(error, null)
               }
               if (result.affectedRows > 0) {
                  cb(null, { status: 'success', message: 'update success!' })
               }
            })
         }
      }
   })
}

Product.order = (data, cb) => {
   console.log(data)
   sql.query('INSERT INTO Orders SET ?', data.order, (error, result) => {
      if (error) {
         cb(error, null)
      }
      if (result?.affectedRows > 0) {
         console.log(result.affectedRows)
         console.log(data.detailOrder)
         try {
            data.detailOrder.forEach(detail => {
               console.log(detail)
               sql.query('INSERT INTO DetailOrder SET ?', detail, (error, result) => {
                  if (error) {
                     console.log(error)
                     throw new Error(error.message)
                  }
               })
            })
            cb(null, { status: ' sucess', message: 'Order success.' })
         } catch (error) {
            cb(error, null)
         }
      }
   })
}
//updateAttrs,drop,searchInTable,create



module.exports = { Product, Attribute, ByProduct, Orders, DetailOrder }