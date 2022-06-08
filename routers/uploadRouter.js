const {Router} = require('express')
const uploadController = require('../controllers/uploadController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = new Router()


router.post('/image', uploadController.uploadImages)
router.get('/get/:id', uploadController.getImages)

module.exports = router