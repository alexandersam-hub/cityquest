const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path');

class UploadController{

    async uploadImages(req,res){
        try{
            const randomString = uuid();
            const localStoragePath = path.join(__dirname, '../', '/public/images')
            const stream = fs.createWriteStream(`${localStoragePath}/${randomString}.${req.body.type}`);
            stream.on('finish', function () {
                return res.json({warning:false, url:`${process.env.URL_SERVER}/api/upload/get/${randomString}.${req.body.type}`});
            });
            stream.write(Buffer.from(req.body.img), 'utf-8');
            stream.end();
        }
        catch (e) {
            return  res.json({warning:true, message:'Не дулось загрузить картинку'});
        }

    }

    async getImages(req,res){
        // console.log('get image',req.params.id)
        try{
            fs.readFile('./public/images/'+req.params.id,(err, data)=>{
                if (err) {
                    // console.log(err)
                    return res.end('404')
                }
                res.statusCode = 200;
                const lastString = req.params.id.substr(req.params.id.length - 3); // => "Tabs1"
                switch (lastString) {
                    case 'png':
                        res.setHeader("Content-Type", "image/png");
                        break
                    case 'svg':
                        res.setHeader("Content-Type", "image/svg+xml");
                        break
                    case 'peg':
                        res.setHeader("Content-Type", "image/jpeg");
                        break

                }
                res.end(data)
            })
        }catch (e) {
            return res.statusCode(404).json({warning:'not image'})
        }

    }


    async getImagesList(req,res){
        return res.end('hello')
    }
}

module.exports = new UploadController()