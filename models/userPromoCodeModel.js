const {Schema, model} = require('mongoose')

const userPromoCodeModel= new Schema({
    user:{type:String},
    quiz:{type:String},
    code:{type:String}
})

module.exports = model('UserPromo',userPromoCodeModel)