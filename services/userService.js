const UserModel = require('../models/UserModel')
const UserDto = require('../dtos/UserDto')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const mailService = require('./mailService')
const getRandomInt = require('./randomNumber')
const progressService = require('./progressService')

class userService{

    async registration(user){
        try{
            if(user.id)
                delete(user.id)
            const userBd = await UserModel.findOne({username:user.username})
            user.password =  bcrypt.hashSync(user.password,7)
            if(userBd){
                return {warning:true, message:'Пользователь с таким имененм уже существует'}
            }
            const newUserBd = await UserModel.create(user)
            const newUser = new UserDto(newUserBd)
            return {warning:false, user:newUser, role:newUser.role, token:tokenService.generationToken({...newUser})}
        }catch (e) {
            return {warning:true, message:'Не удалось создать пользователя: '+e}
        }
    }

    async updateUser(user){
        try{
            if(user.id){
                const id = user.id
                delete (user.id)
                await UserModel.findByIdAndUpdate(id, user)
                const newUser = await UserModel.findById(id)
                return {warning:false, user: new UserDto(newUser)}
            }else{
                return {warning:true, message:'Не userId '}
            }
        }catch (e) {
            return {warning:true, message:'Не удалось изменить пользователя: '+e}
        }
    }

    async removeUser(userId){
        try{
            await progressService.removeProgress(userId)
            const user = await UserModel.findByIdAndRemove(userId)
            return {warning:false, user:new UserDto(user)}
        }catch (e) {
            return {warning:true, message:'Не удалось удалить пользователя: '+e}
        }
    }

    async getAllUsers(){
        try{
            const usersBd = await UserModel.find()
            const users = []
            usersBd.forEach(user=>users.push(new UserDto(user)))
            return {warning:false, users}
        }catch (e) {
            return {warning:true, message:'Ошибка при составении списка пользователей: '+ e}
        }
    }

    async getUserByTelegramId(telegramId){
        try{
            const usersBd = await UserModel.findOne({telegramId})
            if(!usersBd)
                return {warning:true, message:'Пользователь с таким id не существует'}
            const newUser = new UserDto(usersBd)
            const newPassword = getRandomInt(100001,999999)
            await this.updatePassword(newUser.id, newPassword)
            return {warning:false, user:newUser, password:newPassword, role:newUser.role, token:tokenService.generationToken({...newUser})}
        }catch (e) {
            return {warning:true, message:'Ошибка при составении списка пользователей: '+ e}
        }
    }

    async updatePassword(userId, password){
        try{
            const userBd = await UserModel.findById(userId)
            userBd.password = bcrypt.hashSync(password, 7)
            await userBd.save()
            return {warning:false}
        }catch (e) {
            return {warning:true, message:'не удалось обновить пароль пользователя: '+ e}
        }
    }

    async updateUserPassword(email, password, key){
        try{
            const userBd = await UserModel.findOne({email})
            if(!userBd || userBd.stringName !== key)
                return {warning:true, message:'Неверный адрес электронной почты или код подтверждения'}
            userBd.password = bcrypt.hashSync(password, 7)
            await userBd.save()
            return {warning:false, token:tokenService.generationToken({...new UserDto(userBd)})}
        }catch (e) {
            return {warning:true, message:'не удалось обновить пароль пользователя: '+ e}
        }
    }

    async login(username, password){
        try{
            let userBd = await UserModel.findOne({username})
            if(!userBd){
                userBd = await UserModel.findOne({email:username})
            }
            if(userBd){
                if(bcrypt.compareSync(password, userBd.password)) {
                    const user = new UserDto(userBd)
                    const token = tokenService.generationToken({...user})
                    await tokenService.tokenSave(user.id, token)
                    return {warning:false, token, role:user.role}
                }else{
                    return {warning:true, message:'Неверон указан пароль'}
                }
            }else{
                return {warning:true, message:'Нет указанного пользователя'}
            }
        }catch (e) {
            return {warning:true, message:'Ошибка БД при входе: '+ e}
        }
    }

    async checkUsername(username){
        try{
            const currentUser = await UserModel.findOne({username})
            if(currentUser){

                return {warning:false, isCheck:false}
            }
            else
                return {warning:false, isCheck:true}
        } catch (e) {
            return {warning:true, message:'Ошибка БД при входе: '+ e}
        }
    }

    async checkEmail(email){
        try{
            const currentUser = await UserModel.findOne({email})

            if(currentUser) {
                const randomNumber = getRandomInt(100001, 999998)
                currentUser.stringName = randomNumber
                const postSend = await mailService.sendPasswordUpdateUser(email, randomNumber)
                console.log(postSend)
                if(postSend.warning)
                    return {warning:true, message:'Ошибка при отправкке сообщения на электронную почту пользователя'}

                 await currentUser.save()
                 return {warning: false, isCheck: true}
            }
            else
                return {warning:false, isCheck:false}
        } catch (e) {
            return {warning:true, message:'Ошибка БД: '+ e}
        }
    }

    async loginByToken(token){
        try{
            
        }catch (e) {
            
        }
    }
}

module.exports = new userService()