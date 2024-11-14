const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { newOrder, getSingleOrder, myOrders, orders, updateOrders, deleteOrder, cancelOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/order/new').post(newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);

// //ADMIN ROUTES
router.route('/orders').get(isAuthenticatedUser,authorizeRoles('admin'), orders);
router.route('/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateOrders)
                          .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteOrder);
                          
router.route('/cancelorder/:id').put(isAuthenticatedUser,authorizeRoles('admin'), cancelOrder)


                          



module.exports = router
