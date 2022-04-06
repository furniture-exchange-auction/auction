const express = require('express');
const router = express.Router();

// const sessionController = require('../controllers/sessionController');
const sellerController = require('../controllers/sellerController');

// fetch all listed products
router.get('/',
// router.get('/:id',
  // sessionController.isLoggedIn,
  sellerController.getAllProducts,
  (req, res) => res.status(200).json(res.locals.products)
);

// fetch single product detail
router.get('/:id',
  // sessionController.isLoggedIn,
  sellerController.getProductDetail,
  (req, res) => res.status(200).json(res.locals.product)
);

// add product listing
router.post('/',
// router.post('/:id',
  // sessionController.isLoggedIn,
  sellerController.addProduct,
  (req, res) => res.status(200).send('success')
);

// modify product listing
// router.put('/:id',
//   sessionController.isLoggedIn,
//   sellerController.modifyProduct,
//   (req, res) => res.status(200).json(res.locals)
// );

// delete product listing
router.delete('/:id',
// router.delete('/:userId/:id',
  // sessionController.isLoggedIn,
  sellerController.deleteProduct,
  (req, res) => res.status(200).json(res.locals.deletedProduct)
);

module.exports = router;