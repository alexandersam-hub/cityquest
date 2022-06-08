const quizService = require('../services/quizService')
const tokenService = require('../services/tokenService')
const progressService = require('../services/progressService')

class QuizController{
    async getAllActiveQuiz(req,res){
        try {
            const {token} = req.body
            if(!token)
                return res.json({warning:true, badToken:true})

            const user = tokenService.validationToken(token)
            if(!user && !user.id)
                return res.json({warning:true, badToken:true})

            const result = await quizService.getQuizzes()
            const progress = await progressService.getProgressByUserId(user.id)
            if(progress){
                result.progress = progress
                return res.json(result)
            }
            return res.json({warning:true, message:'Ошибка при получении прогресса'})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера '+e})
        }

    }
    
    async getAllQuiz(req, res){
        try {
            const result = await quizService.getQuizzes(false)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера '+e})
        }
    }

    async updateQuiz(req, res){
        try {
            const {quiz} = req.body
            if(quiz){
                const result = await quizService.updateQuiz(quiz)
                return res.json(result)
            }else
                return res.json({warning:true, message:'не передан quiz'})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера '+e})
        }
    }

    async removeQuiz(req, res){
        try {
            const {quiz_id} = req.body
            if(quiz_id){
                const result = await quizService.removeQuiz(quiz_id)
                return res.json(result)
            }else
                return res.json({warning:true, message:'не передан quiz_id'})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера '+e})
        }
    }

    async createQuiz(req, res){
        try {
            const {quiz} = req.body
            if(quiz){
                const result = await quizService.createQuiz(quiz)
                return res.json(result)
            }else
                return res.json({warning:true, message:'не передан quiz_id'})
            return res.json()
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }
}

module.exports = new QuizController()