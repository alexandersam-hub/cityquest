const {Schema, model} = require('mongoose')

const userPromoCodeModel= new Schema({
    user:{type:String, required:true},
    quiz:{type:String},
    code:{type:String}
})

module.exports = model('UserPromo',userPromoCodeModel)