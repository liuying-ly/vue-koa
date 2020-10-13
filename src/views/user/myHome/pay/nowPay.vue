<template>
    <div id="box">
        <el-collapse >
            <el-collapse-item>
                <template slot="title">
                    <div style="padding: 0 12px;width: 100%;height: 50px;overflow: hidden">地址：{{address}}</div>
                </template>
                <el-radio-group v-model="address" style="padding: 12px">
                    <el-radio style="padding: 8px 0" :label="item.address" v-for="(item,index) in addressList" :key="index">{{item.address}}</el-radio>
                </el-radio-group>
            </el-collapse-item>
        </el-collapse>
        <div v-if="type==='object'">
            <van-card
                    :price="item.price/100"
                    :num="item.num"
                    :title="item.name"
                    :thumb="item.image">
            </van-card>
            <van-submit-bar
                    :price="item.price*item.num"
                    button-text="支付"
                    @submit="onSubmit">
                <span slot="tip">
                     <van-cell-group>
                        <van-field v-model="value" placeholder="请输入备注" />
                    </van-cell-group>
                    </span>
            </van-submit-bar>
        </div>

        <div v-else>
            <div style="margin-bottom: 10rem">
                <van-card
                        v-for="(it,id) in item"
                        :key="id"
                        :price="it.price/100"
                        :num="it.num"
                        :title="it.name"
                        :thumb="it.image">
                </van-card>
            </div>

            <van-submit-bar
                    :price="price"
                    button-text="支付"
                    @submit="onSubmitAll">
                 <span slot="tip">
                     <van-cell-group>
                        <van-field v-model="value" placeholder="请输入备注" />
                    </van-cell-group>
                    </span>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "nowPay",
        props: [''],
        data() {
            return {
                item:{},
                type:'',
                price:0,
                addressList:[],
                address:'',
                value:''
            }
        },
        methods: {
            onSubmit(){
                if(!this.$userInfo().ids){
                    this.$toast('请先登陆')
                    this.$routerGo('/login')
                }
                else if(!this.address){
                    this.$toast('请选择收货地址')
                    this.$routerGo('/address')
                }else{
                    this.$api.upPay({ids:this.item.ids,status:'1',address:this.address,message:this.value},res=>{
                        if(res){
                            let shopCar = this.$shopCar.filter((item) => !(this.item.some((i) => i == item)))
                            this.$shopCar.splice(0,this.$shopCar.length,...shopCar)
                            localStorage.setItem('shopCar-'+this.$userInfo().ids,JSON.stringify(this.$shopCar))

                            this.$toast('支付成功')
                            this.$routerGo('/goods')
                        }
                    })
                }

            },
            onSubmitAll(){
                if(!this.address){
                    this.$toast('请选择收货地址')
                }else{
                    new Promise((resolve ,reject)=>{
                        this.item.forEach(val=>{
                            console.log(val)
                            this.$api.upPay({ids:val.ids,status:'1',address:this.address,message:this.value},res=>{
                                if(res){
                                }
                            })
                            resolve(true)
                        })
                    }).then(r=>{
                        this.$toast('支付成功')
                        this.$routerGo('/pay')
                    })
                }
            },
            getAddress(){
                let that=this
                this.$api.getAddress({userId:this.$userInfo().ids||'  '},res=>{
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
            console.log('state')
            console.log(this.$store.state.shop)
            if(this.$route.query&&!this.$store.state.shop){
                this.item=this.$route.query
                this.type='object'
            }else{
                this.type='array'
                this.item=this.$store.state.shop
                let price=0
              //  console.log(this.item)
                this.item.forEach(val=>{
                    price+=val.price*val.num
                })
                this.price=price
            }
        },
        created() {
            this.getAddress()

        },
    }
</script>

<style scoped lang='scss'>
    #box {
        padding-top: 2rem;
		.van-submit-bar__tip {
			background-color: #fff;
			color: #666;
		}
    }
</style>
