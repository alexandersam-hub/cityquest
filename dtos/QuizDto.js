class Quiz{
    id
    title
    description
    tasks
    category
    img
    isActive

    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.title = model.title?model.title:'';
        this.description = model.description?model.description:'';
        this.tasks = model.tasks?model.tasks:[]
        this.category = model.category
        this.img = model.img
        this.isActive = model.isActive
    }
}

module.exports = Quiz