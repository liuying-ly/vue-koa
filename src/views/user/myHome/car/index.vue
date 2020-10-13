<template>
    <div id="box">
        <el-checkbox-group v-model="checkList" style="margin-bottom: 60px">
            <el-checkbox
                    style="width: 100%;margin-bottom:-0.5rem;"
                    v-for="(item,index) in shopCar"
                    :key="index"
                    :label="item">
                <van-card
                        style="width: 100%"
                        :price="Number(item.price/100).toFixed(2)"
                        :num="item.num"
                        :title="item.name"
                        :thumb="item.image">
                    <div slot="footer" style="position: relative;top:-20px">
                        <el-button style=" color: #FF69B4;float: right;height: 22px; width: 22px;border-radius: 0;margin: 0;background: #fff;border: 1px solid #FF69B4;padding: 0;" round plain type="primary"
                                   size="mini" :disabled="item.num>=item.stock_num"  @click="item.num++">+</el-button>
                        <div style="height: 20px; width: 22px;float: right;text-align: center;line-height: 20px;border-bottom: 1px solid #FF69B4;border-top: 1px solid #FF69B4;background: #fff;">{{item.num}}</div>

						<el-button style="color: #FF69B4; float: right;height: 22px; width: 22px;border-radius: 0;margin: 0;background: #fff;border: 1px solid #FF69B4;padding: 0;" round plain type="warning" size="mini" :disabled="item.num<2" @click="item.num--">-</el-button >

                    </div>
                </van-card>
            </el-checkbox>
        </el-checkbox-group>
        <van-submit-bar
                style="bottom: 50px;"
                :price="price"
                button-text="提交"
                @submit="onSubmit">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-button type="danger" round plain size="mini" :disabled="checkList.length<1" @click="deleteAll()">删除</el-button>
        </van-submit-bar>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                shopCar:this.$shopCar,
                checkList:[],
                checkAll: false,
                isIndeterminate: true,
                price:0
            }
        },
        methods: {
            deletes(index){
                this.$shopCar.splice(index,1)
                localStorage.setItem('shopCar-'+this.$userInfo().ids,JSON.stringify(this.$shopCar))
            },
            deleteAll(){
                this.shopCar = this.$shopCar.filter((item) => !(this.checkList.some((i) => i == item)))
                this.$shopCar.splice(0,this.$shopCar.length,...this.shopCar)
                localStorage.setItem('shopCar-'+this.$userInfo().ids,JSON.stringify(this.$shopCar))
            },
            shop(item,index){
                console.log(item)
                item.ids=Date.now()
                item.status='0'
                this.$api.addPay(item,res=>{
                    if(res){
                        this.$routerGo('/nowpay',item)
                    }
                })
            },
            onSubmit(){
                if(this.checkList.length<1){
                    this.$toast('请至少选择一样商品')
                }else{


                    this.$store.state.shop=[]
                    this.checkList.forEach((val)=>{
                        val.ids=Date.now()
                        val.status='0'
                        val.userId=this.$userInfo.ids
                        this.$api.addPay(val,res=>{
                            if(res){
                                this.$store.state.shop.push(val)
                            }
                        })
                    })
                    setTimeout(()=>{
                        console.log(this.$store.state.shop)
                        this.$routerGo('/nowpay',this.checkList)
                    },100)

                }
                console.log(this.checkList)
            },
            handleCheckAllChange(val) {

                this.checkList = val ? this.$shopCar : [];
                console.log(this.checkList)
                this.isIndeterminate = false;
            },
        },
        mounted() {
            console.log(this.$shopCar)
        },
        created() {
        },
        computed:{
            cars(){
                return JSON.parse(JSON.stringify(this.$shopCar))
            }
        },
        watch:{
            cars(){
                let price=0
                this.checkList.forEach(val=>{
                    price+=val.price*val.num
                })
                this.price=parseFloat(price)
            },
            $shopCar(news){
                this.shopCar=news
            },
            checkList(news){
                let price=0
                news.forEach(val=>{
                    price+=val.price*val.num
                })
                this.price=parseFloat(price)
            }
        }
    }
</script>

<style scoped lang='scss'>
    #box {
		margin-top: 2.5rem;
        .el-checkbox__label{
            width: 100%;
        }
		.el-button--danger.is-plain.is-disabled {
			background: #FF69B4;
		}
		.el-button.is-round {
			color: #fff;
			background: #FF69B4;
		}
    }
</style>

<style  lang='scss'>
    #box {
        .el-checkbox__label{
            width: 90%;
        }
        .van-submit-bar__button{
            width: 20% !important;
        }
		.van-submit-bar__button--danger{
			background: hotpink;
		}
		.van-button--round{
			border-radius: 10px;
		}
		.van-button--normal{
			font-size: 16px;
		}
		.van-submit-bar__button{
			height: 35px;
			line-height: 35px;
		}
		.el-button--danger.is-plain{
			background: hotpink;
		}
		.el-button--danger.is-plain.is-disabled, .el-button--danger.is-plain.is-disabled:active, .el-button--danger.is-plain.is-disabled:focus, .el-button--danger.is-plain.is-disabled:hover{
			color: #fff;
		}
		.el-button--mini, .el-button--small{
			font-size: 14px;
		}
		.el-button{

			margin-left: 5px;
		}
		.el-button.is-round {
			border-radius: 10px;
		}
		.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
			background-color: #666;
			border: 0;
			/* border-color: #666; */
		}
		.el-button--mini, .el-button--mini.is-round{
			padding: 6px 9px;
		}
		/* .el-checkbox__inner {
			margin-bottom: 80px !important;
		} */
		.el-button--danger.is-plain {
			color: #fff;
		}
		.van-card {
			background-color: #fff;
		}
		.el-checkbox__inner {
			border: 1px solid #FF69B4;
		}
    }
</style>
