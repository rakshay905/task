const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

// Custom modules to be required.. 
const account_ctr = require('../controller/account_ctr');
const auth = require('../middleware/auth');

// seller panel
router.post('/user/login', account_ctr.login);
router.post('/user/profile', auth.auth, account_ctr.profile);


module.exports = router;