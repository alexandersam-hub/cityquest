const userPromoCodeService = require('../services/userPromoCodeService')
const tokenService = require('../services/tokenService')

class PromoCodeUserController {
    async getPromo(req,res){
        try{
            const {token, quiz} = req.body

            const user = tokenService.validationToken(token)
            console.log(token, quiz,user)
            const result = userPromoCodeService.getCodeByUserId(quiz, user.id)
            return res.json({warning:false, code:result})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервиса'})
        }
    }
}

module.exports = new PromoCodeUserController()