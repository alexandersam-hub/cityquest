const {Schema, model} = require('mongoose')

const Reviews = new Schema({

    user:{type:String},
    text:{type:String},
    count:{type:Number}

})

module.exports = model('Reviews', Reviews)