const {Router} = require('express')
const promoCodeUserController = require('../controllers/promoCodeUserController')

const router = new Router()

router.post('/get', promoCodeUserController.getPromo)

module.exports = router