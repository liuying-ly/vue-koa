<template>
    <div id="box">
        <div v-if="tableData.length>0">
            <el-card v-for="(item,index) in tableData" :key="index" style="margin-bottom: 0.3rem">
                <user-image width="2.2rem" v-if="item.userInfo.length>0" height="2.2rem" border-radius="1.1rem" :src="item.userInfo[0].userImg" style="float: left"></user-image>
                <div style="margin: 0.3rem 0 0.2rem 0.5rem" v-if="item.userInfo.length>0">{{item.userInfo[0].names}} {{$Time(item.ids).getTime()}}</div>
                <div style="margin: 0.3rem 0.4rem">
                    {{item.text}}
                </div>
            </el-card>
        </div>
        <div style="text-align: center;font-size: 1.5rem;margin-top: 1rem" v-else>
            暂无评论
        </div>

        <van-field
                style="position: fixed;bottom: 0;"
                v-model="text"
                center
                clearable
                label="评论"
                placeholder="请输入内容"
        >
            <van-button :disabled ="text===''" slot="button" size="small" type="primary" @click="submits()" style="background: #FF69B4;border: none;">
                发表
            </van-button>
        </van-field>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: ['shareId'],
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
                        shareId:this.shareId+'',
                        userId:this.$userInfo().ids,
                        text:this.text
                    }
                    this.$api.addShareComment(cnt,res=>{
                        if(res){
                            cnt.userInfo=[]
                            cnt.userInfo[0]=this.$userInfo()
                            console.log(cnt)
                            this.tableData.push(cnt)
                        }
                    })
                }

            }
        },
        activated(){
            //this.shareId=this.$route.query.ids

        },
        mounted() {
            console.log(this.shareId)
            this.tableData=[]
            this.$api.getShareComment({shareId:this.shareId+''},res=>{
                if(res)this.tableData=res.filter(val=>{
                    return val.userInfo.length>0&&val.shareId+''===this.shareId+''
                })
            })
        },
        created() {

        },
    }
</script>

<style scoped lang='scss'>
    #box {
        margin-top: 1rem;
        overflow: auto;
        height: 100%;
		
    }
</style>

<style>
    .el-card__body{
        padding: 0.5rem !important;
    }
	.van-field__label {
		width: 50px !important;
	}
	.van-button--small {
		font-size: 14px !important;
	}
</style>