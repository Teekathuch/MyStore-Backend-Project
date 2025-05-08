const express = require('express')
const router = express.Router()

const {register , login , logout , getMe} = require('../controllers/User');
const {protect} = require('../middleware/auth')
router.post('/register' , register);
router.post('/login', login);
router.get('/me', protect , getMe);
router.get('/logout' , logout);

module.exports = router;
