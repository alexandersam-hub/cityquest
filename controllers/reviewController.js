const reviewService = require('../services/reviewService')
const tokenService = require('../services/tokenService')

class ReviewController{

    async getReviews(req,res){
        try{
            const result = await reviewService.getReviews()
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async addReviews(req,res){
        try{
            const {token, text, count} = req.body
            const user = tokenService.validationToken(token)
            const result = await reviewService.addReview(user.id, text,count)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

}

module.exports = new ReviewController()