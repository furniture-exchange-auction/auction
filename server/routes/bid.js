const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');
const bidController = require('../controllers/bidController');

// fetch all bids for a product
router.get('/product/:id',
  sessionController.isLoggedIn,
  bidController.getAllProducts,
  (req, res) => res.status(200).json(res.locals)
);

// place bid on a product (amount in req.body)
router.post('/product/:id',
  sessionController.isLoggedIn,
  bidController.addWatchProduct,
  (req, res) => res.status(200).json(res.locals)
);

// retract bid on a product
router.put('/product/:id',
  sessionController.isLoggedIn,
  bidController.deleteWatchProduct,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;