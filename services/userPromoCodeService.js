const UserPromoCodeModel = require('../models/userPromoCodeModel')

class UserPromoCodeService{

    async addUserPromoCode(quiz, user, code){
        try{
            const userBd = await UserPromoCodeModel.findOne({quiz, user})
            if(userBd){
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
            console.log(quiz, user)
            const userBd = await UserPromoCodeModel.findOne({quiz, user})
            console.log(userBd, userBd.code)
            if(!userBd){
                return {warning:true, message:'Промокод для данной игры не существует'}
            }else{
                return  {warning:false, code:userBd.code}
            }
        }catch (e) {
            return false
        }
    }
}

module.exports = new UserPromoCodeService()

