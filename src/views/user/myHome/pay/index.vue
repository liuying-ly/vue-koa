<template>
    <div id="box">
        <van-tabs v-model="active" @click="onClick">
            <van-tab :title="item" v-for="(item,index) in headL" :key="index">
                <van-card
                        v-for="(item,index) in tableData"
                        :key="index"
                        :price="Number(item.price/100).toFixed(2)"
                        :desc="'备注：'+item.message"
                        :num="item.num"
                        :title="item.name"
                        :thumb="item.image">
                    <div slot="footer">
                        <van-button size="mini" v-if="item.status==='0'" @click="$routerGo('/nowpay',item)">立即支付</van-button>
                        <van-button size="mini" v-if="item.status==='1'" >待发货</van-button>
                        <van-button size="mini" v-if="item.status==='2'" @click="onSubmit(item,index)">立即收货</van-button>
                        <van-button size="mini" v-if="item.status==='3'" @click="$routerGo('/shouhou')">售后</van-button>
                        <van-button size="mini" v-if="item.status==='4'" >已取消订单</van-button>
                        <van-button size="mini" v-if="item.status==='3'" @click="$routerGo('/comment',{goodsId:item.goodId})">评论</van-button>
                    </div>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                active:0,
                tableData:[],
                headL:['全部','待支付','待发货','待收货']
            }
        },
        methods: {
            onClick() {
                let cnt={}
               if(this.active>0){
                cnt.status=parseInt(this.active-1)+''
               }
               this.getPay(cnt)
            },
            getPay(cnt){
                cnt.userId=this.$userInfo.ids
                this.$api.getPay(cnt,res=>{
                    if(res){
                        this.tableData=res
                    }
                })
            },
            onSubmit(row,index){
                this.$api.upPay({ids:row.ids,status:'3'},res=>{
                    if(res){
                        this.$toast('已收货')
                        let item=JSON.parse(JSON.stringify(row))
                        item.status=status
                        this.tableData.splice(index,1,item)
                    }
                })
            }
        },
        mounted() {
            this.onClick()
        },
        created() {
        },
    }
</script>

<style scoped lang='scss'>
    #box {
       margin-top: 2.5rem;
	   .van-button--default {
	   	color: #fff;
	   	    background-color: #FF69B4;
	   	    border: 1px solid #FF69B4;
	   }
	   .van-button--mini {
		   min-width: auto;
		   padding: 0 5px;
	   }
    }
</style>