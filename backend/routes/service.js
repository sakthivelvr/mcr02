const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { getServices, newService, getSingleService, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

router.route('/services').get(getServices);
router.route('/service/:id').get(getSingleService);
router.route('/service/:id').put(updateService);
router.route('/service/:id').delete(deleteService);

router.route('/admin/service/new/:id').post(isAuthenticatedUser, authorizeRoles('admin'), newService);

module.exports = router