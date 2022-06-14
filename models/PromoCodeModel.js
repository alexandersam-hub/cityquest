const {Schema, model} = require('mongoose')

const PromoCode = new Schema({
    quiz:{type:String},
    currentNumber:{type:Number},
    prefix:{type:String}
})

module.exports = model('PromoCode', PromoCode)