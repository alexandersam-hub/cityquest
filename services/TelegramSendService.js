const request = require('request');

class TelegramSendService{
    sendMessageToAdmin(data){
        try{
            request.post(
                'http://127.0.0.1:8005/api/message/send',
                {json:{data}},
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                    }
                }
            );
        }catch (e) {
            return false
        }

    }
}

module.exports = new TelegramSendService()