const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(getProducts);

router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)
router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/review').delete(deleteReview)

router.route('/review').get(getReviews)


router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);


module.exports = router