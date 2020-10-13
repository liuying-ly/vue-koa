<template>
    <div id="box">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" width="100%" height="200px" />
            </van-swipe-item>
        </van-swipe>
        <van-grid >
            <van-grid-item
                    v-for="(value,index) in menuData"
                    :key="index"
                    icon="shop-o"
                    @click="$routerGo('/goods',{index:index})"
                    :text="value.names">
            </van-grid-item>
        </van-grid>

        <div class="hot">热卖商品</div>
        <el-row>
            <el-col :span="12" v-for="(item,index) in tableData"
                    :key="index">
                <div class="goods" >
                    <van-card
                            @click="shop(item)"

                            :price="Number(item.prices.split(',')[0]).toFixed(2)"
                            :num="sums(item.nums.split(','))"
                            :title="item.names"
                            :thumb="$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[0]">
                    </van-card>
                </div>
            </el-col>
        </el-row>

        <goodsInfo ref="goodsInfo" :ruleForm="ruleForm"  ></goodsInfo>
    </div>
</template>

<script>
    import goodsInfo from '../goods/info'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[],
                menuData:[],
                ruleForm:{},
                images: [
                    require('@/assets/img/1.jpg'),
                    require('@/assets/img/2.jpg'),
                    require('@/assets/img/4.jpg'),]
            }
        },
        methods: {
            sums(arr){
                var s = 0;
                for (var i=arr.length-1; i>=0; i--) {
                    s += parseInt(arr[i]);
                }
                return s;
            },
            shop(item){
                this.ruleForm=item
                this.$refs.goodsInfo.changeShow(item)
            },
            getGoods(cnt){
                this.$api.getGoods(cnt,res=>{
                    if(res){
                        this.tableData=res
                    }
                })
            },
        },
        mounted() {
        },
        created() {
            this.getGoods({})
            this.$api.getSort({},res=>{
                if(res) this.menuData=res.slice(0,8)
            })
        },
        components:{
            goodsInfo
        }
    }
</script>

<style scoped lang='scss'>
    #box {
	    margin-top: 5rem;
        width: 100vw;
        .my-swipe .van-swipe-item {
            color: #fff;
            text-align: center;
        }
		.hot {
			font-size: 1.8rem;
			text-align: center;
			color: hotpink;
			margin-top: 1rem;
		}
		.van-swipe__indicator--active {
			background: #FF69B4 !important;
		}
		.el-col-12 {
			width: 100% !important;
		}
    }
</style>
<style lang='scss'>
 .van-swipe__indicator {
	 opacity: 1;
 	background: #fff !important;
 }
		.van-swipe__indicator--active {
			background: #FF69B4 !important;
		}

</style>
