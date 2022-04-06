const express = require('express');
const router = express.Router();

// const sessionController = require('../controllers/sessionController');
const bidController = require('../controllers/bidController');

// fetch bids for an auction
router.get('/:id',
  // sessionController.isLoggedIn,
  bidController.getBids,
  (req, res) => res.status(200).json(res.locals.bids)
);

// place bid in an auction (price in req.body)
router.post('/:id',
  // sessionController.isLoggedIn,
  bidController.placeBid,
  (req, res) => res.status(200).json(res.locals.placedBid)
);

// retract bid for an auction
router.put('/:id',
  // sessionController.isLoggedIn,
  bidController.retractBid,
  (req, res) => res.status(200).json(res.locals.retractedBid)
);

module.exports = router;