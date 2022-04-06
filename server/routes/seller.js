const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');
const sellerController = require('../controllers/sellerController');

// fetch all listed products
router.get('/product',
  sessionController.isLoggedIn,
  sellerController.getAllProducts,
  (req, res) => res.status(200).json(res.locals)
);

// fetch single product detail
router.get('/product/:id',
  sessionController.isLoggedIn,
  sellerController.getProductDetail,
  (req, res) => res.status(200).json(res.locals)
);

// add product listing
router.post('/product',
  sessionController.isLoggedIn,
  sellerController.addProduct,
  (req, res) => res.status(200).json(res.locals)
);

// modify product listing
// router.put('/product/:id',
//   sessionController.isLoggedIn,
//   sellerController.modifyProduct,
//   (req, res) => res.status(200).json(res.locals)
// );

// delete product listing
router.delete('/product/:id',
  sessionController.isLoggedIn,
  sellerController.deleteProduct,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;