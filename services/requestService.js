const nodeFetch = require('node-fetch')

class RequestService{

    async pullPromoToQuizServer(code, userData){
        try{
            nodeFetch(process.env.URL_QUIZ_SERVER+'/api/promo/pull',{
                method:'POST',
                body:{
                    code,
                    user_data:JSON.stringify(userData)
                },
                headers:{ 'Content-Type': 'application/json'}
            }).then(res => res.json()).then(json=>{
                return !json.warning;
            })
        }catch (e) {
            return false
        }
    }

}

module.exports = new RequestService()