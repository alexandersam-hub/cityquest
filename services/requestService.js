const WebSocket = require('ws');
    const client = new WebSocket('ws://localhost:8100');
client.onopen = function () {
    console.log('подключился');
};

class RequestService{

    async pullPromoToQuizServer(code, userData){
        try{
            console.log('send',code, userData)
            client.send(JSON.stringify({action: 'promoQuest', data: {code, userData}}));
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

module.exports = new RequestService()