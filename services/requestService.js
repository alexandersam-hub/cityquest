const request = require('request');

class RequestService{

    async pullPromoToQuizServer(code, userData){
        try{
            // console.log('send',code, userData)
            request.post(
                'http://127.0.0.1:8003/api/promo/pull',
                {json:{code, user_data:userData}},
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                    }
                }
            );
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

module.exports = new RequestService()