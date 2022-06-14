const request= require('request')

class RequestService{

    async pullPromoToQuizServer(code, userData){
        try{
            request({
                url:process.env.URL_QUIZ_SERVER+'/api/promo/pull',
                method:'POST',
                json: true,
                body:{
                    code,
                    user_data:JSON.stringify(userData)
                },
                headers:{ 'Content-Type': 'application/json'}
            }).then(res => res.json()).then(json=>{
                return !json.warning;
            })
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

module.exports = new RequestService()