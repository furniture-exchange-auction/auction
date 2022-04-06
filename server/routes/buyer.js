const express = require('express');
const router = express.Router();

// const sessionController = require('../controllers/sessionController');
const buyerController = require('../controllers/buyerController');

// fetch all products
router.get('/',
  // sessionController.isLoggedIn,
  buyerController.getAllProducts,
  (req, res) => res.status(200).json(res.locals.products)
);

// fetch single product detail
router.get('/:id',
  // sessionController.isLoggedIn,
  buyerController.getProductDetail,
  (req, res) => res.status(200).json(res.locals.product)
);

// add product to watch list
router.post('/:id',
  // sessionController.isLoggedIn,
  buyerController.addWatchProduct,
  (req, res) => res.status(200).json(res.locals)
);

// delete product from watch list
router.delete('/:id',
  // sessionController.isLoggedIn,
  buyerController.deleteWatchProduct,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;