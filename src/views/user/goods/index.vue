<template>
    <div id="box">
        <div class="leftMenu">
            <van-sidebar v-model="sorts" @change="onChange" >
                <van-sidebar-item title="全部" ></van-sidebar-item>
                <van-sidebar-item :title="item.names" v-for="(item,index) in menuData"></van-sidebar-item>
            </van-sidebar>
        </div>

        <div class="goods">
            <van-card
                    @click="shop(item)"
                    v-for="(item,index) in tableData"
                    :key="index"
                    :price="Number(item.prices.split(',')[0]).toFixed(2)"
                    :num="sums(item.nums.split(','))"
                    :title="item.names"
                    :thumb="$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[0]">
                <!--<div slot="footer">-->
                    <!--&lt;!&ndash;<van-button size="mini" @click="detailss(item)">详情</van-button>&ndash;&gt;-->
                    <!--<van-button size="mini" @click="collections(item)">收藏</van-button>-->
                    <!--<van-button size="mini" @click="shop(item)">购买</van-button>-->
                <!--</div>-->
            </van-card>
        </div>
        <goodsInfo ref="goodsInfo" :ruleForm="ruleForm"  ></goodsInfo>
    </div>
</template>

<script>
    import goodsInfo from './info'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                showInfo:false,
                sorts:0,
                menuData:[],
                tableData:[],
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
                this.$refs.goodsInfo.changeShow(item)
            },
            collections(item){
                this.$collect.push(item)
                localStorage.setItem('collect',JSON.stringify(this.$collect))
                this.$toast('收藏')
            },
            detailss(item){
                this.$routerGo('/goodsInfos',item)
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
            changes(){
                let cnt
                if(this.names&&this.sortName){cnt={"names":{"$regex":this.names},'sorts':this.sortName}}
                else if(this.names){cnt={"names":{"$regex":this.names}}}
                else if(this.sortName){cnt={'sorts':this.sortName}}
                else{cnt={}}
                this.getGoods(cnt)
            }
        },
        mounted() {
            if(this.$route.query.index>=0){

                console.log(this.sorts)
                setTimeout(()=>{
                    this.sorts=Number(this.$route.query.index)+1
                    this.onChange( this.sorts)
                },100)

            }
        },
        created() {
            this.getGoods({})
            this.$center.$on('changeName',val=>{
                this.names=val
                this.changes()
            })
            this.$api.getSort({},res=>{
                if(res) this.menuData=res
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


    }
</style>
