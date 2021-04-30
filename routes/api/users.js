const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/flagpage' )
router.get('/:username', usersCtrl.profile);


/*---------- Protected Routes ----------*/




module.exports = router;