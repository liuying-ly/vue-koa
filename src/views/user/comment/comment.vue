<template>
    <div id="box">
        <el-card v-for="(item,index) in tableData" :key="index" style="margin-bottom: 0.3rem">
            <user-image width="2.2rem" height="2.2rem" border-radius="1.1rem" :src="item.img" style="float: left"></user-image>
           <div style="margin: 1rem 0 0.2rem 0.2rem">{{item.user}} {{$Time(item.ids).getTime()}}</div>
            <div style="margin: 0.3rem 0.4rem">
                {{item.text}}
            </div>
        </el-card>


        <van-field
                style="position: fixed;bottom: 0;"
                v-model="text"
                center
                clearable
                label="评论"
                placeholder="请输入内容"
                >
            <van-button :disabled ="text===''" slot="button" size="small" type="primary" @click="submits()">
                发表
            </van-button>
        </van-field>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: [''],
        data() {
            return {
                tableData:[],
                text:''
            }
        },
        methods: {
            submits(){
                if(!this.$userInfo().username){
                    this.$toast('请先登陆')
                }else{
                    let cnt={
                        ids:Date.now()+'',
                        goodsId:this.$route.query.goodsId,
                        user:this.$userInfo().names,
                        userId:this.$userInfo().ids,
                        img:this.$userInfo().userImg,
                        text:this.text
                    }
                    this.$api.addComment(cnt,res=>{
                        if(res){
                            this.tableData.push(cnt)
                        }
                    })
                }
            },
        },
        mounted() {
        },
        created() {
            this.$api.getComment({goodsId:this.$route.query.goodsId},res=>{
                if(res){
                    this.tableData=res
                }
            })
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