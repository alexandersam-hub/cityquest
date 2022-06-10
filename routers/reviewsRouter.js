const {Router} = require('express')
const reviewController = require('../controllers/reviewController')

const router = new Router()

router.post('/get', reviewController.getReviews)
router.post('/add', reviewController.addReviews)

module.exports = router