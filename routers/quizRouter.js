const {Router} = require('express')
const quizController = require('../controllers/quizController')
// const adminMiddleware = require('../middlewares/adminMiddleware')
// const userMiddleware = require('../middlewares/usersMiddleware')

const router = new Router()

router.post('/get',quizController.getAllActiveQuiz)
router.post('/get_all', quizController.getAllQuiz)
router.post('/add', quizController.createQuiz)
router.post('/update', quizController.updateQuiz)
router.post('/remove', quizController.removeQuiz)

module.exports = router