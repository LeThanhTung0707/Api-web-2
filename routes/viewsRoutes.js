const express = require('express');

const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();
router.get('/signup', viewController.getSignUp);
router.get('/me', authController.protect, viewController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.submitUserData
);
router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLogin);

module.exports = router;
