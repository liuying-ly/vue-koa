<template>
    <div id="boxs" v-if="show">
        <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :goods-id="goodsId"
                :hide-stock="sku.hide_stock"
                :message-config="messageConfig"
                @add-cart="addCarts"
                @buy-clicked="buyClick"
        >
            <template slot="sku-header-extra">
                <div>
                    <el-button type="primary" @click="collections()" plain round style="width: 5rem;margin-top: 0.5rem;float: left" size="mini">收藏</el-button>
                    <!--<el-button type="primary" @click="share()" plain round style="width: 5rem;margin-top: 0.5rem" size="mini">分享</el-button>-->
                </div>
            </template>
            <template slot="sku-messages">
                <div>

                </div>
            </template>
            <template slot="sku-body-top">
				<div class="goods-head" style=" position: absolute;top: 0;left: 0; width: 100%; height: 2.5rem;background: #FF69B4;">
					<div slot="left" style="color:#ffffff;margin: 0.5rem 0 0 1rem;" >
						<van-icon name="arrow-left" />
					</div>
					<div style="position: fixed;top:0.5rem;right: 50%;transform: translateX(50%); color: #fff;">Meng 宠</div>
					<img src="@/assets/logo.png" style="width: 2.2rem;height: 2.2rem;position: fixed;top:0.1rem;right: 1rem;">
				</div>
                <div style="position: absolute;top: 0;width: 70%;left:15%;height: 12rem;margin-top: 2.5rem;">
                    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                        <van-swipe-item v-for="(it,index) in ruleForm.images.split(',')" :key="index">
                            <img :src="$nodeUrl+'file/getImg?imagePath='+it" width="100%" style="height: 12rem" >
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </template>
            <template slot="extra-sku-group" slot-scope="props">
                <!--<el-collapse accordion>-->
                    <!--<el-collapse-item>-->
                        <!--<template slot="title">-->
                            <!--<div style="padding: 0 12px">收获地址：{{address}}</div>-->
                        <!--</template>-->
                        <!--<el-radio-group v-model="address" style="padding: 12px">-->
                            <!--<el-radio style="padding: 8px 0" :label="item.address" v-for="(item,index) in addressList" :key="index">{{item.address}}</el-radio>-->
                        <!--</el-radio-group>-->
                    <!--</el-collapse-item>-->
                <!--</el-collapse>-->

                <div style="padding: 10px 12px" @click="$routerGo('/comment',{goodsId:goodsId})">
                    评论
                </div>
            </template>
        </van-sku>
    </div>
</template>

<script>
    export default {
        name: "info",
        props: [''],
        data() {
            return {
                addressList:[],
                address:'',
                ruleForm:{},
                show:false,
                goodsId:'',
                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '规格', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                    previewImgUrl: 'https://img.yzcdn.cn/2.jpg', // 用于预览显示的规格类目图片
                                },
                                {
                                    id: '2',
                                    name: '蓝色',
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                                    previewImgUrl: 'https://img.yzcdn.cn/2.jpg',
                                }
                            ],
                            k_s: 's1'// skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 1, // skuId，下单时后端需要
                            price: 100, // 价格（单位分）
                            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                            stock_num: 110 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 2, // skuId，下单时后端需要
                            price: 200, // 价格（单位分）
                            s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
                            stock_num: 210 // 当前 sku 组合对应的库存
                        }
                    ],

                    messages: [
                        {
                            // 商品留言
                            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                            name: '留言', // 留言名称
                            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                            required: '1', // 是否必填 '1' 表示必填
                            placeholder: '' // 可选值，占位文本
                        }
                    ],
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 数据结构见下方文档
                },
                messageConfig: {
                    // 数据结构见下方文档
                }
            }
        },
        methods: {

            collections(){
                let item=this.ruleForm
                console.log(item)
                if(!this.$userInfo().username){
                    this.$toast('请先登陆')
                    this.$routerGo('/login')
                }else{
                    this.$collect.push(item)
                    localStorage.setItem('collect',JSON.stringify(this.$collect))
                    this.$toast('收藏成功')
                }
            },
            share(){
                let item=JSON.parse(JSON.stringify(this.ruleForm))
                console.log(item)
                if(!this.$userInfo().username){
                    this.$toast('请先登陆')
                    this.$routerGo('/login')
                }else{
                    item.userId=this.$userInfo().ids
                    this.$routerGo('/publishShare',item)
                }
            },
            addCarts(data){
                if(!this.$userInfo().username){
                    this.$toast('请先登陆')
                    this.$routerGo('/login')
                }else {
                    let sel = data.selectedSkuComb
                    let cnt = {
                        goodId: data.goodsId,
                        message: data.messages.message_0,
                        num: data.selectedNum,
                        name: sel.name,
                        image: sel.imgUrl,
                        price: sel.price,
                        userId: this.$userInfo().ids,
                        stock_num: sel.stock_num
                    }
                    //console.log(cnt)
                    console.log(data)
                    this.$shopCar.push(cnt)
                    localStorage.setItem('shopCar-' + this.$userInfo().ids, JSON.stringify(this.$shopCar))
                    //this.$routerGo('/car')
                    this.$toast('添加成功')
                }
            },
            buyClick(data){
                console.log(data)
                let sel=data.selectedSkuComb
                let cnt={
                    goodId:data.goodsId,
                    message:data.messages.message_0,
                    num:data.selectedNum,
                    name:sel.name,
                    image:sel.imgUrl,
                    price:parseFloat(sel.price),
                    userId:this.$userInfo().ids
                }
                cnt.ids=Date.now()
                cnt.status='0'
                console.log(cnt)
                this.$api.addPay(cnt,res=>{
                    if(res){
                        this.$store.state.shop=false
                        this.$routerGo('/nowpay',cnt)
                    }
                })
            },
            changeShow(form){
                // {
                //     id: '1', // skuValueId：规格值 id
                //         name: '红色', // skuValueName：规格值名称
                //     imgUrl: 'https://img.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                //     previewImgUrl: 'https://img.yzcdn.cn/2.jpg', // 用于预览显示的规格类目图片
                // },
                // {
                //     id: 1, // skuId，下单时后端需要
                //         price: 100, // 价格（单位分）
                //     s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                //     stock_num: 110 // 当前 sku 组合对应的库存
                // },

                let item =JSON.parse(JSON.stringify(form))
                console.log(item)
                this.ruleForm=item
                let list=[]
                item.specs.split(',').forEach((val,index)=>{
                    list.push({})
                    list[index].id=item.ids+''+index
                    list[index].s1=item.ids+''+index
                    list[index].name=val
                    list[index].imgUrl=this.$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[index]
                    list[index].previewImgUrl=this.$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[index]
                    list[index].price=100*parseFloat(item.prices.split(',')[index])
                    list[index].stock_num=parseInt(item.nums.split(',')[index])
                })
                this.goodsId=item.ids
                this.sku.tree[0].v=list
                this.sku.list=list
                this.show=true
            },
            getAddress(){
                let that=this
                this.$api.getAddress({userId:this.$userInfo().ids},res=>{
                    if(res){
                        res.forEach((val,index)=>{
                            that.addressList.push({'address':''})
                            that.addressList[index].address=val.name+val.tel+val.province+val.city+val.county+val.addressDetail
                        })
                        that.address=that.addressList[0].address
                    }
                })
            }
        },
        mounted() {

        },
        created() {
            //this.getAddress()
            console.log(1)
        },
    }
</script>

<style scoped lang='scss'>
    #boxs {
        .el-collapse-item__header{
            padding: 0 12px;
        }
        .el-divider--horizontal{
            margin: 0.8rem 0 !important;
        }
		.el-button--primary.is-plain {
		    color: #fff;
		    background: #FF69B4;
		    border-color: #FF69B4;
		}

    }
</style>

<style lang="scss">
    .van-popup--bottom.van-popup--round{
        min-height: 100vh !important;
        max-height: 100% !important;
        border-radius: 0 !important;
    }
    .van-sku-header{
        margin-top: 14.5rem;
    }
	.van-popup__close-icon--top-right {
		top: 0.5rem !important;
		left: 0.7rem !important;
	}
     .van-popup__close-icon{
     	/* display: none !important; */
		color: transparent !important;
     }
	/* .van-card {
		 background-color: #fde2e2 !important;
	 } */
	 .van-sidebar-item {
	 		 /* background-color: #fde2e2 !important; */
			 border-bottom: 0.1rem solid #fff;
	 }
	 .van-sidebar-item--select {
	     color: #323233;
	     border-color: #FF69B4 !important;
	 }
	 .van-sidebar-item--select, .van-sidebar-item--select:active {
	     background-color: #FF69B4 !important;
	 }
	 .van-sidebar {
	     width: 60px !important;
	     text-align: center;
	 }
      .van-sku-actions .van-button--warning {
		 background: linear-gradient(to right,#ff88c2,#ff69b4) !important;
	 }
	 .van-sku-actions .van-button--danger {
			 background: linear-gradient(to right,#ff69b4,#ff88c2) !important;
	 }
	 .van-sku-header__img-wrap img {
	 	height: 100% !important;
	 }
</style>
