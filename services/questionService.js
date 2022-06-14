const progressService = require('./progressService')
const quizService = require('./quizService')
const PromoCodeModel = require('../models/PromoCodeModel')
const requestService = require('./requestService')
class QuestionService{

    checkRoundCoordinate(valueAnswer, valueOrigin){
        const valueAnswerRound = Math.round(valueAnswer*100000)
        const valueOriginMin = Math.round(valueOrigin*100000) - 30
        const valueOriginMax = Math.round(valueOrigin*100000)+ 30
        // console.log(valueOriginMin, valueOriginMax)
        // console.log(valueAnswerRound)
        return valueOriginMin <= valueAnswerRound && valueAnswerRound <= valueOriginMax
    }

    async checkAnswerGeo(userId, quizId, answer){
        // console.log(answer)
        try{
            const quiz = await quizService.getQuizById(quizId)
            const progress = await progressService.getProgressByUserId(userId)
            if(!quiz.warning && progress){
                const currentProgress = progress.currentTaskNumber.find(t=>t.quiz === quizId)
                const currentTaskNumber = currentProgress && currentProgress.taskNumber?currentProgress.taskNumber:0
                const currentQuizGeolocation = quiz.quiz.tasks[currentTaskNumber].geolocation
                if(this.checkRoundCoordinate(answer.latitude,currentQuizGeolocation[0]) && this.checkRoundCoordinate(answer.longitude,currentQuizGeolocation[1])){
                    if(currentProgress){
                        if(currentTaskNumber<quiz.quiz.tasks.length-1)
                            progress.currentTaskNumber.find(t=>t.quiz === quizId).taskNumber = currentTaskNumber+1
                        if(currentTaskNumber===quiz.quiz.tasks.length-1){
                            progress.isFinished.push(quiz.quiz.id)
                            progress.dateFinish.push({quiz:quiz.quiz.id, date:new Date()})
                            await this.finishUser(quiz.quiz.id)
                        }
                    }else{
                        progress.dateStart.push({quiz:quiz.quiz.id, date:new Date()})
                        progress.currentTaskNumber.push({quiz:quizId,taskNumber: currentTaskNumber+1})
                    }
                    progress.position.push(answer)
                    await progressService.updateProgress(progress)
                    return {warning:false, answer:true, progress:progress}
                }else{
                    if(!currentProgress){
                        progress.dateStart.push({quiz:quiz.quiz.id, date:new Date()})
                    }
                    progress.position.push(answer)
                    await progressService.updateProgress(progress)
                    return {warning:false, answer:false}
                }
            } return {warning:true, message:'Ошибка при получении игры или прогресса текущего пользователя'}
        }catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка при получении игры или прогресса текущего пользователя '+e}
        }


    }

    async finishUser(quizId){
        try{
            const promo = await PromoCodeModel.findOne({quiz:quizId})
            let code
            if(promo){
                promo.currentNumber++
                if(promo.currentNumber<10){
                   code = '0000'+promo.currentNumber
               }else if(promo.currentNumber<100){
                   code = '000'+promo.currentNumber
               }else if(promo.currentNumber<1000){
                   code = '00'+promo.currentNumber
               }else{
                   code = promo.currentNumber.toString()
               }
               await promo.save()
            }
            else {
                await PromoCodeModel.create({quiz:quizId, currentNumber:1})
                code = '00001'
            }

            const res = await requestService.pullPromoToQuizServer(code, quizId)
            return res
        }catch (e) {
            return false
        }
    }
}

module.exports = new QuestionService()