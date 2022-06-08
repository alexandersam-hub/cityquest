const {Schema, model} = require('mongoose')

const Progress = new Schema({

    user:{type:String},
    currentTaskNumber:{type:[Object]},
    position:{type:[Object]},
    dateEnter:{type:Date},
    dateStart:{type:[Object]},
    dateFinish:{type:[Object]},
    description:{type:String},
    isFinished:{type:[String], default: false}

})

module.exports = model('Progress', Progress)