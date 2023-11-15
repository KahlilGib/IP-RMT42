const express = require('express');
const ControllerUser = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandle');
const { authorizationAdmin } = require('../middlewares/authorization');
const router = express.Router();

router.post('/add-user', ControllerUser.addUser);
router.post('/login', ControllerUser.login);


router.use(errorHandler)

module.exports = router;