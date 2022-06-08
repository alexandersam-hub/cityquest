class UserDto{

    id
    username
    password
    role
    stringName
    phone
    email
    tokenWhereFrom
    telegramId
    tokenGame
    isActive
    description

    constructor(model) {
        this.id = model.id?model.id.toString():''
        this.username = model.username;
        this.password = model.password;
        this.role = model.role?model.role:''
        this.stringName = model.stringName?model.stringName:''
        this.phone = model.phone?model.phone:''
        this.email = model.email?model.email:''
        this.tokenWhereFrom = model.tokenWhereFrom?model.tokenWhereFrom:''
        this.telegramId = model.telegramId?model.telegramId:''
        this.tokenGame = model.tokenGame?model.tokenGame:''
        this.isActive = model.isActive?model.isActive:false
        this.description = model.description?model.description:''
    }
}

module.exports = UserDto