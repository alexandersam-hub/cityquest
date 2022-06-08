const {Router} = require('express')
const userController = require('../controllers/userController')
// const adminMiddleware = require('../middlewares/adminMiddleware')
// const createCard = require('../controllers/CreatedCardController')

const router = new Router()

router.post('/login', userController.login)
router.post('/registration', userController.registration)
router.post('/get',userController.getUsers )

router.post('/update',userController.updateUser )
router.post('/update_password', userController.updateUserPassword)
router.post('/update_user_password_by_key', userController.updateUserPasswordByKeyEmail)
router.post('/delete',userController.deleteUser)

router.post('/check_username',userController.checkUsername)
router.post('/check_email',userController.checkUserEmail)

router.post('/get_user_id',userController.getUserIdByToken)

module.exports = router