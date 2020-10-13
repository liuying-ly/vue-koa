<template>
    <div id="box">
        <div class="goods">
            <van-card
                    v-for="(item,index) in tableData"
                    :key="index"
                    :price="Number(item.prices.split(',')[0]).toFixed(2)"
                    :num="sums(item.nums.split(','))"
                    :title="item.names"
                    :thumb="$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[0]">
                <div slot="footer">
                    <van-button size="mini" @click="collections(index)">删除</van-button>
                    <van-button size="mini" @click="shop(item)">购买</van-button>
                </div>
            </van-card>
        </div>
        <goodsInfo ref="goodsInfo" :ruleForm="ruleForm"  ></goodsInfo>
    </div>
</template>

<script>
    import goodsInfo from '../../goods/info'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                showInfo:false,
                sorts:0,
                menuData:[],
                tableData:this.$collect,
                names:'',
                sortName:'',
                ruleForm:{}
            }
        },
        methods: {
            onChange(index){
                if(index===0){
                    this.sortName=''
                }else{
                    this.sortName=this.menuData[index-1].names
                }
                this.changes()

            },
            shop(item){
                this.ruleForm=item
                console.log(item)
                this.$refs.goodsInfo.changeShow(item)
            },
            collections(index){
                this.$collect.splice(index,1)
                localStorage.setItem('collect-'+this.$userInfo.ids,JSON.stringify(this.$collect))
                this.$toast('删除成功')
            },
            getGoods(cnt){
                this.$api.getGoods(cnt,res=>{
                    if(res){
                        this.tableData=res
                    }
                })
            },
            sums(arr){
                var s = 0;
                for (var i=arr.length-1; i>=0; i--) {
                    s += parseInt(arr[i]);
                }
                return s;
            },
        },
        mounted() {
        },
        created() {
        },
        components:{
            goodsInfo
        }
    }
</script>

<style scoped lang='scss'>
    #box {
		margin-top: 2.5rem;
        height: 82vh;
        overflow: hidden !important;
        .leftMenu{
            height: 100%;
            overflow: auto;
            float: left;
            margin-right: 0.5rem;
        }
        .goods{
            height: 100%;
            overflow: auto;
        }
        ::-webkit-scrollbar { /*滚动条整体样式*/
            width: 0.2rem;
            background-color: #f5f5f5;
            border-radius: 0.42rem;
        }
		.van-button--default {
			color: #fff;
			    background-color: #FF69B4;
			    border: 1px solid #FF69B4;
		}
    }
</style>