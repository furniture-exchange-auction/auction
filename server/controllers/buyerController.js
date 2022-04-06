const db = require('../models/auction');

const buyerController = {};

buyerController.getAllProducts = (req, res, next) => {
  const getProductsQuery = 'SELECT p._id, p.title, a.*, ph.*, b.* FROM product p, auction a, photo ph, bid b WHERE a.product_id = p._id AND ph.product_id = p._id AND a.active = true AND b.auction_id = a._id';
  
  db.query(getProductsQuery)
    .then((data) => {
      res.locals.products = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `buyerController.getAllProducts: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in buyerController.getAllProducts. Check server log for more details.',
        },
      });
    });
};

buyerController.getProductDetail = (req, res, next) => {
  const prodId = req.params.id;
  const getProductDetailQuery = 'SELECT p._id, p.title, a.*, ph.*, b.* FROM product p, auction a, photo ph, bid b WHERE p._id = $1 a.product_id = p._id AND ph.product_id = p._id AND a.active = true AND b.auction_id = a._id';
  
  db.query(getProductDetailQuery, [prodId])
    .then((data) => {
      res.locals.product = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `buyerController.getProductDetail: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in buyerController.getProductDetail. Check server log for more details.',
        },
      });
    });
};

buyerController.addWatchProduct = (req, res, next) => {
  const userId = res.locals.userId;
  const prodId = req.params.id;
  
  const addWatchQuery = 'INSERT INTO watch_item (buyer_id, product_id) VALUES ($1, $2) RETURNING *';
  const addWatchQueryVals = [userId, prodId];

  db.query(addWatchQuery, addWatchQueryVals)
    .then((data) => {
      res.locals.addedWatch = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `buyerController.addWatchProduct: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in buyerController.addWatchProduct. Check server log for more details.',
        },
      });
    });
};

buyerController.deleteWatchProduct = (req, res, next) => {
  const userId = res.locals.userId;
  const prodId = req.params.id;

  const deleteWatchQuery = 'DELETE FROM watch_item WHERE buyer_id = $1 AND product_id = $2 RETURNING *';
  const deleteWatchQueryVals = [userId, prodId];

  db.query(deleteTaskQuery, deleteTaskQueryVals)
    .then((data) => {
      res.locals.deletedWatch = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `buyerController.deleteWatchProduct: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in buyerController.deleteWatchProduct. Check server log for more details.',
        },
      });
    });
};

module.exports = buyerController;