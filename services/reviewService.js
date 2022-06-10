const ReviewsDto = require('../dtos/reviewsDto')
const ReviewModule = require('../models/reviewsModel')

class ReviewService{
    async getReviews(){
        try{
            const reviewModel = await ReviewModule.find()
            const reviews = []
            reviewModel.forEach(r=>reviews.push(new ReviewsDto(r)))
            return {warning:false, reviews}
        }catch (e) {
            return {warning:true, message:'Ошибка загрузки: '+e}
        }
    }
    async addReview(user,text,count){
        try{
            const reviewModel = await ReviewModule.create({user, text,count})
            const review = new ReviewsDto(reviewModel)
            return {warning:false, review}
        }catch (e) {
            return {warning:true, message:'Ошибка загрузки: '+e}
        }
    }
}

module.exports = new ReviewService()