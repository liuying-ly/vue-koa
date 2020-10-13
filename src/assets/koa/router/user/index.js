const Router = require('koa-router') // koa 路由中间件
const router = new Router(); // 实例化路由
const Lmdb = require('../../sql/linkMDB')
const lmdb =new Lmdb()
const  md5 = require("md5-node");
router.post('/login',     async (ctx,next)=>{
	   if(ctx.request.body.password){
	   		 ctx.request.body.password  = md5(ctx.request.body.password);
	   }
    ctx.body=  await lmdb.get('user', ctx.request.body, next)
})

//用户
router.post('/addUser',    async (ctx)=>{
	    if(ctx.request.body.password){
	    		 ctx.request.body.password  = md5(ctx.request.body.password);
	    }
    console.log(ctx.request.body)
     ctx.body= await lmdb.add('user',ctx.request.body)
})
router.post('/upUser',     async (ctx,next)=>{
	if(ctx.request.body.password){
			 ctx.request.body.password  = md5(ctx.request.body.password);
	}
	console.log(ctx.request.body)
    ctx.body=  await lmdb.update('user',{ids:ctx.request.body.ids}, {$set:ctx.request.body}, next)
})
router.post('/getUser',     async (ctx,next)=>{
    //delete ctx.request.body.ids
	if(ctx.request.body.password){
			 ctx.request.body.password  = md5(ctx.request.body.password);
	}
	console.log(ctx.request.body)
    ctx.body=  await lmdb.get('user',ctx.request.body, next)
})
//管理员增删改查
router.post('/addAdmin',     async (ctx,next)=>{
	if(ctx.request.body.adminpassword){
			 ctx.request.body.adminpassword  = md5(ctx.request.body.adminpassword);
	}
	    console.log(ctx.request.body)
    ctx.body=  await lmdb.add('admin', ctx.request.body, next)
})

router.post('/upAdmin',     async (ctx,next)=>{
    delete ctx.request.body._id
	if(ctx.request.body.adminpassword){
			 ctx.request.body.adminpassword  = md5(ctx.request.body.adminpassword);
	}
	console.log(ctx.request.body)
    ctx.body=  await lmdb.update('admin',{ids:ctx.request.body.ids}, {$set:ctx.request.body}, next)
})
router.post('/deAdmin',     async (ctx,next)=>{
    //delete ctx.request.body.ids
	// if(ctx.request.body.adminpassword){
	// 		 ctx.request.body.adminpassword  = md5(ctx.request.body.adminpassword);
	// }
	console.log(ctx.request.body)
    ctx.body=  await lmdb.del('admin',ctx.request.body, next)
})
router.post('/getAdmin',     async (ctx,next)=>{
    //delete ctx.request.body.ids
	 console.log(ctx.request.body)
	 if(ctx.request.body.adminpassword){
		 ctx.request.body.adminpassword  = md5(ctx.request.body.adminpassword);
	 }
    ctx.body=  await lmdb.get('admin',ctx.request.body, next)
})
//分类增删改查
router.post('/addSort',     async (ctx,next)=>{
    ctx.body=  await lmdb.add('sort', ctx.request.body, next)
})

router.post('/upSort',     async (ctx,next)=>{
    delete ctx.request.body._id
    ctx.body=  await lmdb.update('sort',{ids:ctx.request.body.ids}, {$set:ctx.request.body}, next)
})
router.post('/deSort',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('sort',ctx.request.body, next)
})
router.post('/getSort',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('sort',ctx.request.body, next)
})


//订单增删改查
router.post('/getPay',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('pay',ctx.request.body, next)
})
router.post('/upPay',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.update('pay',{ids:ctx.request.body.ids},{$set:ctx.request.body}, next)
})
router.post('/delPay',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('pay',ctx.request.body, next)
})
router.post('/addPay',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('pay',ctx.request.body, next)
})
//商品增删改查
router.post('/getGoods',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('goods',ctx.request.body, next)
})
router.post('/upGoods',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.update('goods',{ids:ctx.request.body.ids},{$set:ctx.request.body}, next)
})
router.post('/delGoods',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('goods',ctx.request.body, next)
})
router.post('/addGoods',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('goods',ctx.request.body, next)
})

router.post('/addAddress',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('address',ctx.request.body, next)
})

router.post('/getAddress',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('address',ctx.request.body, next)
})
router.post('/delAddress',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('address',ctx.request.body, next)
})
router.post('/upAddress',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.update('address',{id:ctx.request.body.id},{$set:ctx.request.body}, next)
})

router.post('/addComment',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('comment',ctx.request.body, next)
})
router.post('/getComment',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('comment',ctx.request.body, next)
})
router.post('/delComment',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('comment',ctx.request.body, next)
})

router.post('/addShare',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('share',ctx.request.body, next)
})
router.post('/getShare',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('share',ctx.request.body, next)
})
router.post('/selectShare',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.link(['share','userId'],['user','ids'],'userInfo')
})
router.post('/delShare',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.del('share',ctx.request.body, next)
})
router.post('/upShare',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.get('share',ctx.request.body, next)
})

router.post('/getShareComment',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.link(['share_comment','userId'],['user','ids'],'userInfo')
})
router.post('/addShareComment',     async (ctx,next)=>{
    //delete ctx.request.body.ids
    ctx.body=  await lmdb.add('share_comment',ctx.request.body, next)
})







module.exports=router