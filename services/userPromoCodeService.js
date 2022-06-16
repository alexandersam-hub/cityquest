const UserPromoCodeModel = require('../models/userPromoCodeModel')

class UserPromoCodeService{

    async addUserPromoCode(quiz, user, code){
        try{
            const user = await UserPromoCodeModel.findOne({quiz, user})
            if(user){
                return {warning:true, message:'Промокод для данной игры и данного пользователя уже существует'}
            }else{
                await UserPromoCodeModel.create({quiz, user, code})
                return  {warning:false, code}
            }
        }catch (e) {
            return  {warning:true, message:'Ошибка при создании промокода: '+e}
        }
    }

    async getCodeByUserId(quiz, user){
        try{
            const user = await UserPromoCodeModel.findOne({quiz, user})
            if(!user){
                return {warning:true, message:'Промокод для данной игры не существует'}
            }else{
                return  {warning:false, code:user.code}
            }
        }catch (e) {
            return false
        }
    }
}

module.exports = new UserPromoCodeService()

