const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const { processPayment, sendStripeApi, processPaymentPayNowQr } = require('../controllers/paymentController');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/payment/process/paynowqr').post(isAuthenticatedUser, processPaymentPayNowQr);

router.route('/stripeapi').get(sendStripeApi);

module.exports = router