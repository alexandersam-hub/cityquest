
class ReviewsDto{

    id
    user
    text
    count

    constructor(model) {
        this.id = model.id?model.id.toString():''
        this.user = model.user?model.user:''
        this.text = model.text?model.text:''
        this.count = model.count?model.count:0
    }
}

module.exports = ReviewsDto