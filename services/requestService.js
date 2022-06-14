const messenger= require('messenger')
const client = messenger.createSpeaker(8100);

class RequestService{

    async pullPromoToQuizServer(code, userData){
        try{
            client.request('give promo', {code, userData}, data=>{
                if(!data.warning)
                    return true
                else{
                    setTimeout(
                        ()=>this.pullPromoToQuizServer(), 1000
                    )

                }
            })
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

module.exports = new RequestService()