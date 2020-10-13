const Router = require('koa-router') // koa 路由中间件
const router = new Router(); // 实例化路由
const fs =require('fs')
//const upload = require("../fun/upload.js")
const path=require("path");

router.post('/upFile',async (ctx, next)=>{

    const file = ctx.request.files.file; // 获取上传文件
    let name=Date.now()
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../static/uploads/') + `/${name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = name
})



router.get('/getImg',async (ctx)=>{
    console.log(ctx.request.url)
    let url=ctx.request.url.substr(23,ctx.request.url.length-12)
    console.log(url)
    let filePath = path.join(__dirname, '../static/uploads/') +url
    var content = fs.readFileSync(filePath,"binary");
    ctx.status = 200
    ctx.res.write(content, 'binary')
    ctx.body=''
})

module.exports=router