class ProgressDto{

    id
    user
    currentTaskNumber
    position
    dateEnter
    dateStart
    dateFinish
    description
    isFinished

    constructor(progress) {
        this.id = progress.id?progress.id.toString():''
        this.user = progress.user?progress.user:''
        this.currentTaskNumber = progress.currentTaskNumber?progress.currentTaskNumber:[]
        this.position = progress.position?progress.position:[]
        this.dateEnter = progress.dateEnter?progress.dateEnter:''
        this.dateStart = progress.dateStart?progress.dateStart:[]
        this.dateFinish = progress.dateFinish?progress.dateFinish:[]
        this.description = progress.description?progress.description:''
        this.isFinished = progress.isFinished?progress.isFinished:[]

    }
}

module.exports = ProgressDto