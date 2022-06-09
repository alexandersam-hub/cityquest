const progressService = require('./progressService')
const quizService = require('./quizService')

class QuestionService{

    checkRoundCoordinate(valueAnswer, valueOrigin){
        const valueAnswerRound = Math.round(valueAnswer*100000)
        const valueOriginMin = Math.round(valueOrigin*100000) - 50
        const valueOriginMax = Math.round(valueOrigin*100000 )+ 50
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
                        }
                    }else{

                        progress.currentTaskNumber.push({quiz:quizId,taskNumber: currentTaskNumber+1})
                    }
                    progress.position.push(answer)
                    await progressService.updateProgress(progress)
                    return {warning:false, answer:true, progress:progress}
                }else{
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
}

module.exports = new QuestionService()