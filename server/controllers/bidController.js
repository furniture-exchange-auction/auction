const db = require('../models/auction');

const bidController = {};

bidController.getBids = (req, res, next) => {
  const auctionId = req.params.id;
  const getBidsQuery = 'SELECT * FROM bid WHERE auction_id = $1';
  
  db.query(getBidsQuery, [auctionId])
    .then((data) => {
      res.locals.bids = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `bidController.getBids: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in bidController.getBids. Check server log for more details.',
        },
      });
    });
};

bidController.placeBid = (req, res, next) => {
  const userId = res.locals.userId;
  const auctionId = req.params.id;
  const { price } = req.body;
  
  const placeBidQuery = 'INSERT INTO bid (buyer_id, auction_id, price) VALUES ($1, $2, $3) RETURNING *';
  const placeBidQueryVals = [userId, auctionId, price];

  db.query(placeBidQuery, placeBidQueryVals)
    .then((data) => {
      res.locals.placedBid = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `bidController.placeBid: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in bidController.placeBid. Check server log for more details.',
        },
      });
    });
};

bidController.retractBid = (req, res, next) => {
  const userId = res.locals.userId;
  const auctionId = req.params.id;

  const retractBidQuery = 'UPDATE bid SET retracted = false WHERE buyer_id = $1 auction_id = $2 AND timestamp = (SELECT MAX (timestamp) FROM bid) RETURNING *';
  const retractBidQueryVals = [userId, auctionId];

  db.query(retractBidQuery, retractBidQueryVals)
    .then((data) => {
      res.locals.retractedBid = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `bidController.retractBid: ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: 'Error occurred in bidController.retractBid. Check server log for more details.',
        },
      });
    });
};

module.exports = bidController;