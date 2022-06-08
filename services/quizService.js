const QuizModel = require('../models/QuizModel')
const QuizDto=require('../dtos/QuizDto')

class quizService{

    async getQuizzes(onlyActive=true){
        try{
            let quizzesBd
            if(onlyActive){
                quizzesBd = await QuizModel.find({isActive:true})
            }else{
                quizzesBd = await QuizModel.find()
            }
            const quizzes = []
            quizzesBd.forEach(quiz=>{
                quizzes.push(new QuizDto(quiz))
            })
            return {warning:false, quizzes}
        }catch (e) {
            return {warning:true, message:'Ошибка выгрузки игр '+e}
        }
    }

    async createQuiz(quiz){
        try{
            const quizBd = await QuizModel.findOne({title:quiz.title})
            if(quizBd)
                return  {warning:true, message:'Игра с таким названием уже существует'}
            if (quiz.id)
                delete (quiz.id)
            const newQuiz = await QuizModel.create({...quiz})
            return {warning:false, quiz:new QuizDto(newQuiz)}
        }catch (e) {
            return  {warning:true, message:'Ошибка при создании игры  '+e}
        }
    }

    async updateQuiz(quiz){
        try{
            if (quiz.id){
                const id = quiz.id
                delete (quiz.id)
                await QuizModel.findByIdAndUpdate(id, {...quiz})
                const newQuiz =  await QuizModel.findById(id)
                return {warning:false, quiz:new QuizDto(newQuiz)}
            }else{
                return  {warning:true, message:'Не заполнено поле id'}
            }
        }catch (e) {
            return  {warning:true, message:'Ошибка при обновлении '+e}
        }
    }

    async removeQuiz(quizId){
        try{
            if(!quizId)
                return  {warning:true, message:'Не заполнено поле id'}
            await QuizModel.findByIdAndDelete(quizId)
            return  {warning:false}
        }catch (e) {
            return  {warning:true, message:'Ошибка при удалении игры  '+e}
        }
    }

    async getQuizById(quizId){
        try{
            if(!quizId)
                return  {warning:true, message:'Не заполнено поле id'}
            const quiz = await QuizModel.findById(quizId)
            if(quiz)
                return  {warning:false, quiz:new QuizDto(quiz)}
            return {warning:false, quiz:{}}
        }catch (e) {
            return {warning:true, message:'Ошибка при экспорте игры  '+e}
        }
    }
}

module.exports = new quizService()