const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({storage : multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/user'))
    },
    filename : function(req, file, cb) {
        cb(null, file.originalname)
    }
}) });

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword,
     getUserProfile, changePassword, updateProfile,
      getAllUsers, getUser, updateUser, deleteUser, 
       googleOAuthRequest,
       oauth} = require('../controllers/authController');

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { get } = require('mongoose');

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/updateprofile').put(isAuthenticatedUser, upload.single('avatar'), updateProfile);

//ADMIN-ROUTES
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser)
                               .put(isAuthenticatedUser,authorizeRoles('admin'), updateUser)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser);

//SIGNIN WITH GOOGLE OAUTH
router.route('/request').post(googleOAuthRequest);
router.route('/oauth').get(oauth);

module.exports = router

