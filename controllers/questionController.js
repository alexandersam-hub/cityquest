const questionService = require('../services/questionService')
const tokenService = require('../services/tokenService')

class QuestionController{

    async changeAnswerGeo(req,res){
        try {
            const {answer,token, quiz_id} = req.body
            const user = tokenService.validationToken(token)
            const result = await questionService.checkAnswerGeo(user.id, quiz_id, answer)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'ошибка сервера: '+e})
        }
    }

}

module.exports = new QuestionController()