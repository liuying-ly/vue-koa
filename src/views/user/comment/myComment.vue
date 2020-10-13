<template>
    <div id="box">
        <van-swipe-cell v-for="(item,index) in tableData" :key="index">
            <el-card  style="margin-bottom: 0.3rem">
                <div style="width: 100%;height: 5rem" v-if="good[index]">
                    <user-image width="5rem" height="5rem"  :src="good[index].images.split(',')[0]" style="float: left"></user-image>
                    <div>
                        {{good[index].names}}</div>
                </div>

                <br>
                <user-image width="2.2rem" height="2.2rem" border-radius="1.1rem" :src="item.img" style="float: left"></user-image>
                <div style="margin: 1rem 0 0.2rem 0.2rem">
                    <div style="float: left;margin-right: 2rem">{{item.user}}</div>
                        <div>{{$Time(item.ids).getTime()}}</div></div>
                <div style="margin: 0.3rem 0.4rem">
                    {{item.text}}
                </div>
            </el-card>
            <template slot="right">
                <van-button square type="danger" @click="deleteS(item,index)" text="删除" />
            </template>
        </van-swipe-cell>

    </div>
</template>

<script>
    export default {
        name: "comment",
        props: [''],
        data() {
            return {
                tableData:[],
                text:'',
                good:[]
            }
        },
        methods: {
            deleteS(item,index){
                this.$api.delComment({ids:item.ids},res=>{
                    if(res){
                        this.good.splice(index,1)
                        this.tableData.splice(index,1)
                    }
                })
            },
            getGoods(goodId){
                this.$api.getGoods({ids:goodId},res=>{
                    if(res){
                        this.good.push(...res)
                    }
                })
            },
        },
        mounted() {
            this.$api.getComment({userId:this.$userInfo().ids},res=>{
                if(res){
                    this.tableData=res
                    res.forEach(val=>{
                        this.getGoods(val.goodsId)
                    })
                }
            })
        },
        created() {

        },
    }
</script>

<style scoped lang='scss'>
    #box {
        margin-top: 2.5rem;
    }
</style>

<style>
    .el-card__body{
        padding: 0.5rem !important;
    }
</style>
