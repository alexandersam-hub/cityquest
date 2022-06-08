const userService = require('../services/userService')
const tokenService = require('../services/tokenService')


const warningServer = {warning:true, message:'Ошибка сервера'}

class UserController{

    async login(req,res){
        try{
            const {username, password} = req.body
            const result = await userService.login(username, password)
            return res.json(result)
        }
        catch (e) {
           return res.json(warningServer)
        }
    }


    async registration(req,res){
        try{
            const {user} = req.body
            if(user){
                const result = await userService.registration(user)
                return res.json(result)
            }
            else{
                return res.json({warning:true, data:{
                        message:`Не заполнено поле user`
                    }})
            }
        }
        catch (e) {
            return res.json(warningServer)
        }
    }
    async getUsers(req,res) {
        try{
            const result = await userService.getAllUsers()
            return res.json(result)
        }
        catch (e) {
            return res.json(warningServer)
        }
    }



    async updateUser(req,res,next){
        try{

            const {user} = req.body
            if(user){
                const result = await userService.updateUser(user)
                return res.json(result)
            }
            else{
                return res.json({warning:true, data:{
                        message:`Пользователь не изменен`
                    }})
            }
        }
        catch (e) {
            return res.json(warningServer)
        }
    }

    async updateUserPassword(req,res){
        try{
            const {user_id, password} = req.body
            if(user_id && password){
                const result = await userService.updatePassword(user_id, password)
               return res.json(result)
            }
            else{
                return res.json({warning:true, message:`Пароль не изменен`})
            }
        }
        catch (e) {
            return res.json(warningServer)
        }
    }

    async updateUserPasswordByKeyEmail(req,res){
        try{
            const {email, key, password} = req.body
            if(email && password && key){
                const result = await userService.updateUserPassword(email, password, key)
                return res.json(result)
            }  else{
                return res.json({warning:true, message:`Заполнены не все поля`})
            }
        }catch (e) {
            return res.json(warningServer)
        }
    }
    
    async deleteUser(req,res,next){
        try{
            const {user_id} = req.body
            if(user_id){
                const result = await userService.removeUser(user_id)
                return res.json(result)
            }
            else{
                return res.json({warning:true, message:`UserId не передан`})
            }
        }
        catch (e) {
            return res.json(warningServer)
        }
    }

    async checkUsername(req,res){
        try{
            const {username} = req.body
            if(username){
                const result = await userService.checkUsername(username)
                return res.json(result)
            }else
                return res.json({warning:true, message:'Поле username не заполнено'})
        }catch (e) {
            return res.json(warningServer)
        }
    }

    async checkUserEmail(req,res){
        try{
            const {email} = req.body
            if(email){
                const result = await userService.checkEmail(email)
                return res.json(result)
            }else
                return res.json({warning:true, message:'Поле email не заполнено'})
        }catch (e) {
            return res.json(warningServer)
        }
    }

    async getUserIdByToken(req,res){
        try{
            const {token} = req.body
            if(token){
                const result = await tokenService.validationToken(token)
                return res.json({warning:false, userId:result.id})
            }else
                return res.json({warning:true, message:'Поле token не заполнено'})
        }catch (e) {
            return res.json(warningServer)
        }
    }
}

module.exports = new UserController()