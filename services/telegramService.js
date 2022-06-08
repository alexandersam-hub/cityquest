const userService = require('./userService')
const UserDto = require('../dtos/UserDto')
const randomNumber = require('./randomNumber')

class TelegramService{

    async createUserByTelegramId(telegramId){
        const password = randomNumber(100001,999999).toString()
        const newUser = new UserDto({username:telegramId, telegramId, password, role:'user', isActive:true, tokenWhereFrom:'telegramUser'})
        const userCreated = await userService.registration(newUser)
        userCreated.password = password
        return userCreated
    }

    async getUserByTelegramId(telegramId){
        const user = await userService.getUserByTelegramId(telegramId)
        return user
    }
}

module.exports = new TelegramService()