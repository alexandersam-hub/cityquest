const {Router} = require('express')
const questionController = require('../controllers/questionController')
const router = new Router()

router.post('/change_geo', questionController.changeAnswerGeo)

module.exports = router