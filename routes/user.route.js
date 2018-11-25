const express = require('express')
const router = express.Router()

//require the controller
const user_controller = require('../controllers/user.controller')

router.post('/register', user_controller.register)
router.post('/login', user_controller.login)
router.post('/getUserById', user_controller.getUserById)

module.exports = router
