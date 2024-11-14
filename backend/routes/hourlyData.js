const express = require('express');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { getHourlyData } = require('../controllers/hourlyDataController');
const router = express.Router();

router.route('/hourlydata').get(getHourlyData);

module.exports = router
