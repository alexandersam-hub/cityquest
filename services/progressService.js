const ProgressDto = require('../dtos/ProgressDto')
const ProgressModel = require('../models/ProgressModel')

class ProgressService {

    async createProgress(userId, noCheck = false){
        try{
            if(noCheck){
                const progress = await ProgressModel.findOne({user:userId})
                if(progress){
                    return {warning:false, progress}
                }
            }
            const newProgress = await ProgressModel.create({user:userId, currentTaskNumber:[], position:[], dateStart:[], dateFinish:[], dateEnter:new Date(),description:'', isFinished:[] })
            return {warning:false, progress: new ProgressDto(newProgress)}
        }catch (e) {
            return {warning:true, message:'Ошибка БД: '+e}
        }
    }

    async updateProgress(progress){
        try{
            if(progress.id){
                const id = progress.id
                delete (progress.id)
                await ProgressModel.findByIdAndUpdate(id, progress)
                return {warning:false}
            }
          return {warning:true, message:'Не заполнено поле id'}
        }   catch (e) {
            return {warning:true, message:'Не удалось обновить текущий прогресс '+e}
        }
    }

    async removeProgress(user){
        try{
            await ProgressModel.findByIdAndDelete({user})
            return {warning:false, message:'Прогресс удален'}
        } catch (e) {
            return {warning:true, message:'Не удалось удалить текущий прогресс '+e}
        }
    }

    async getProgressByUserId(userId){
        const progress = await ProgressModel.findOne({user:userId})
        if(progress)
            return new ProgressDto(progress)
        const newProgress = await this.createProgress(userId, true)
        if(newProgress.warning)
            return null
        return newProgress.progress
    }

}

module.exports = new ProgressService()