const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { 
    getServices, newService, getSingleService, updateService, deleteService 

} = require('../controllers/serviceController');
const { getSubServices } = require('../controllers/subServiceController');
const router = express.Router();

router.route('/subservices').get(getSubServices);
router.route('/subservice/:id').get(getSingleService);
router.route('/subservice/:id').put(updateService);
router.route('/subservice/:id').delete(deleteService);

router.route('/admin/subservice/new/:id').post(isAuthenticatedUser, authorizeRoles('admin'), newService);

module.exports = router