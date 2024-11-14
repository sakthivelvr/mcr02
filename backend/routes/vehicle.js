const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const {  getVehicles, newVehicle, getSingleVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const router = express.Router();



router.route('/vehicles').get(getVehicles);
router.route('/vehicle/:id').get(getSingleVehicle);
router.route('/vehicle/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateVehicle);
router.route('/vehicle/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteVehicle);


router.route('/admin/vehicle/new').post(isAuthenticatedUser, authorizeRoles('admin'), newVehicle);




module.exports = router