const express = require('express')
const userRouter = require('./routers/userRouters')
const quizRouter = require('./routers/quizRouter')
const questionRouter = require('./routers/questionRouter')
const uploadRouter = require('./routers/uploadRouter')
const mongoose = require('mongoose')
const fs = require('fs');


const https = require('https');
const cors = require('cors')

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

require('dotenv').config()

const PORT = process.env.PORT || 8008
const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.static(__dirname+'/public'));
app.use(
    cors({

    })
);

app.use('/api/user',userRouter)
app.use('/api/question',questionRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/upload',uploadRouter)

const start = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        https.createServer(options, app).listen(8448);
        app.listen(PORT,()=>{
            console.log(`start on port ${PORT}`)
        })
        // // https.createServer(options, app).listen(8443);
        // for(let i=200; i<=700;i++){
        //     await authServices.removeUserByUserName('ru_'+i)
        // }


    }
    catch (e) {
        console.log(e)
    }

}

start()