const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup', 
  [
    check('name')
      .not().
      isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
], usersController.postSignp);

router.post('/login', usersController.postLogin);

module.exports = router;
