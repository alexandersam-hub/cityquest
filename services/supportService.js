const SupportModel = require('../models/SupportModel')
const SupportDto = require('../dtos/SupportDto')
const authService = require('./userService')
const telegramService = require('./TelegramSendService')
class SupportService{

    async createNewPost(userId, username, mail, text, description=''){
        try{

            const res = await SupportModel.create({userId, username, mail, text, description, isSend:false})
            telegramService.sendMessageToAdmin(`Городской квест: пользователь: ${username}, почта: ${mail}, текст: ${text}`)
            return {warning:false, data:{...new SupportDto(res)}}
        }
        catch (e) {
            return {warning:true, message:'Ошибка записи в БД'}
        }

    }

    async mailIsSend(id){
        try{
            const post = await SupportModel.findById(id)
            post.isSend = true
            post.save()

            return {warning:false}
        }
        catch (e) {
            return {warning:true, message:'Ошибка изменения поля в БД'}
        }

    }

    async getPosts(){

        try{
            const posts = await SupportModel.find()
            const postsDto = []

            posts.forEach(post=>{
                postsDto.push(new SupportDto(post))
            })

            return {warning:false, posts:postsDto}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка выгрузки'}
        }
    }

    async deletePost(id){
        try{
            await SupportModel.findByIdAndDelete(id)
            return {warning:false, message:'Пост удален'}
        }
        catch (e) {
            return {warning:true, message:'Ошибка изменения поля в БД'}
        }
    }
    async updatePost(post){
        try{
            const id = post.id
            delete (post.id)
            await SupportModel.findByIdAndUpdate(id, {...post})
            return {warning:false, message:'Пост изменен'}
        }
        catch (e) {
            return {warning:true, message:'Ошибка изменения полей в БД'}
        }
    }

}

module.exports = new SupportService()