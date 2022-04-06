const db = require('../models/auction');

const sellerController = {};

sellerController.getAllProducts = (req, res, next) => {
  console.log(req.user);
  const userId = req.user.id;
  const getProductsQuery = 'SELECT p._id, p.title, a.*, ph.*, b.* FROM product p, auction a, photo ph, bid b WHERE p.seller_id = $1 AND a.product_id = p._id AND ph.product_id = p._id AND a.active = true AND b.auction_id = a._id';
  
  db.query(getProductsQuery, [userId])
    .then((data) => {
      res.locals.products = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `sellerController.getAllProducts: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in sellerController.getAllProducts. Check server log for more details.',
        },
      });
    });
};

sellerController.getProductDetail = (req, res, next) => {
  console.log(req.user);
  const userId = req.user.id;
  const prodId = req.params.id;
  const getProductDetailQuery = 'SELECT p._id, p.title, a.*, ph.*, b.* FROM product p, auction a, photo ph, bid b WHERE p.seller_id = $1 AND p._id = $2 AND a.product_id = p._id AND ph.product_id = p._id AND a.active = true AND b.auction_id = a._id';
  const getProductDetailQueryVals = [userId, prodId];
  
  db.query(getProductDetailQuery, getProductDetailQueryVals)
    .then((data) => {
      res.locals.product = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `sellerController.getProductDetail: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in sellerController.getProductDetail. Check server log for more details.',
        },
      });
    });
};

sellerController.addProduct = (req, res, next) => {
  console.log('user', req.user);
  const userId = req.user.id;
  // const userId = req.params.id;
  const { opening_bid, title, condition, brand, description } = req.body;
  
  const addProductQuery = 'INSERT INTO product (seller_id, opening_bid, title, condition, brand, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const addProductQueryVals = [userId, opening_bid, title, condition, brand, description];

  db.query(addProductQuery, addProductQueryVals)
    .then((data) => {
      const prodId = data.rows[0]._id;
      const { url, alt_text } = req.body;

      const addPhotoQuery = 'INSERT INTO photo (url, alt_text, product_id) VALUES ($1, $2, $3)';
      const addPhotoQueryVals = [url, alt_text, prodId];

      db.query(addPhotoQuery, addPhotoQueryVals)
        .then(() => {
          const { category } = req.body;

          const findCategoryQuery = 'SELECT _id from category WHERE name = $1';

          db.query(findCategoryQuery, [category])
            .then((data) => {
              const categoryId = data.rows[0]._id;
              
              const addCategoryQuery = 'INSERT INTO product_category (product_id, category_id) VALUES ($1, $2)';
              const addCategoryQueryVals = [prodId, categoryId];

              db.query(addCategoryQuery, addCategoryQueryVals)
                .then(() => {
                  const { end_time } = req.body;
                  
                  const addAuctionQuery = 'INSERT INTO auction (product_id, end_time) VALUES ($1, $2)';
                  const addAuctionQueryVals = [prodId, new Date(end_time)];

                  db.query(addAuctionQuery, addAuctionQueryVals)
                    .then(() => {
                      console.log('should be done');
                      return next();
                    })
                    .catch((err) => {
                      return next({
                        log: `sellerController.addProduct: addAuction ERROR: ${
                          typeof err === 'object' ? JSON.stringify(err) : err
                        }`,
                        message: {
                          err: 'Error occurred in sellerController.addProduct. Check server log for more details.',
                        },
                      });
                    });
                })
                .catch((err) => {
                  return next({
                    log: `sellerController.addProduct: addCategory ERROR: ${
                      typeof err === 'object' ? JSON.stringify(err) : err
                    }`,
                    message: {
                      err: 'Error occurred in sellerController.addProduct. Check server log for more details.',
                    },
                  });
                });
            })
            .catch((err) => {
              return next({
                log: `sellerController.addProduct: findCategory ERROR: ${
                  typeof err === 'object' ? JSON.stringify(err) : err
                }`,
                message: {
                  err: 'Error occurred in sellerController.addProduct. Check server log for more details.',
                },
              });
            });
        })
        .catch((err) => {
          return next({
            log: `sellerController.addProduct: addPhoto ERROR: ${
              typeof err === 'object' ? JSON.stringify(err) : err
            }`,
            message: {
              err: 'Error occurred in sellerController.addProduct. Check server log for more details.',
            },
          });
        });
    })
    .catch((err) => {
      return next({
        log: `sellerController.addProduct: addProduct ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in sellerController.addWatchProduct. Check server log for more details.',
        },
      });
    });
};

// sellerController.modifyProduct = (req, res, next) => {
//   const userId = res.locals.userId;
//   const prodId = req.params.id;

//   const deleteWatchQuery = 'DELETE FROM product WHERE seller_id = $1 AND _id = $2 RETURNING *';
//   const deleteWatchQueryVals = [userId, prodId];

//   db.query(deleteTaskQuery, deleteTaskQueryVals)
//     .then((data) => {
//       res.locals.deletedWatch = data.rows[0];
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `sellerController.deleteProduct: ERROR: ${
//           typeof err === 'object' ? JSON.stringify(err) : err
//         }`,
//         message: {
//           err: 'Error occurred in sellerController.deleteProduct. Check server log for more details.',
//         },
//       });
//     });
// };

sellerController.deleteProduct = (req, res, next) => {
  const userId = req.user.id;
  // const userId = req.params.userId;
  const prodId = req.params.id;

  const deleteProductQuery = 'DELETE FROM product WHERE seller_id = $1 AND _id = $2 RETURNING *';
  const deleteProductQueryVals = [userId, prodId];

  db.query(deleteProductQuery, deleteProductQueryVals)
    .then((data) => {
      res.locals.deletedProduct = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `sellerController.deleteProduct: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in sellerController.deleteProduct. Check server log for more details.',
        },
      });
    });
};

module.exports = sellerController;