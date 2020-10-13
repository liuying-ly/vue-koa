<template>
    <div id="box">
        <div style=" width: 100%;height: 100vh;position: absolute;top: 0;background-color: #ffffff">
           <!-- <img src="../../../assets/notFound.jpg" style="position: absolute;z-index: 0;height: 100vh;width: 100%;background: #fffffff">
           --> <div style="width: 70%;margin: 0 auto;padding-top: 16rem">
                <!--<div style="margin: 1rem auto;width: 10rem;height: 10rem">-->
                    <!--<up-img ref="upImg" @change="changeImg" @success="successImg"></up-img>-->
                <!--</div>-->
                <el-card>
                    <van-cell-group>
                        <van-field style="border: 1px solid #FF69B4;margin-bottom: 10px;" v-model="ruleForm.username" placeholder="请输入账号" />
                        <van-field style="border: 1px solid #FF69B4;margin-bottom: 10px;" type="password" v-model="ruleForm.password" placeholder="请输入密码" />
                        <van-field style="border: 1px solid #FF69B4;margin-bottom: 10px;" v-model="ruleForm.names" placeholder="请输入昵称" />
                    </van-cell-group>
                    <van-button type="primary" round style="z-index: 10;width: 100%;height: 3rem;line-height: 3rem; font-size: 1.5rem;margin-top: 1rem;background: #FF69B4;border: none;border-radius: 0;" @click="signUp"> 注册</van-button>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "login",
        props: [''],
        data() {
            return {
                ruleForm:{
                    username:'',
                    password:'',
                    names:'',
                },
                userImg:''

            }
        },
        methods: {
            signUp(){
                let that=this
                let form =JSON.parse(JSON.stringify(this.ruleForm))
                new Promise((rs,rj)=>{
                    for(let i in form){
                        if(!form[i]){
                            console.log(i+form[i])
                            rj(false)
                        }
                    }
                    rs(true)
                }).then(r=>{
                    that.successImg()
                }).catch(r=>{
                    this.$toast('请填写完整');
                })
            },
            changeImg(file){
                this.ruleForm.file=file
            },
            successImg(){

                //this.userImg=path;
                let form =JSON.parse(JSON.stringify(this.ruleForm));
                form.userImg='';
                form.ids=Date.now()+''
                form.grade='普通用户'
                console.log('ther')
                this.$api.login({username:form.username},r=>{
                    if(r.length<1){
                        this.$api.addUser(form,res=>{
                            if(res) {
                                Toast('注册成功')
                                for(let i in this.ruleForm){
                                    this.ruleForm[i]=''
                                }
                                this.$routerGo('login')
                            }
                        })
                    }else{
                        Toast('已有此账号');
                    }
                })
            }
        },
        mounted() {
        },
        created() {
        },
    }
</script>

<style scoped lang='scss'>
    #box {
		margin-top: 2.5rem;
        overflow: hidden !important;
        height:81vh;
		background-color: #ffffff;
        .inputs{
            margin-bottom: 2rem;
        }
        .el-card.is-always-shadow {
			box-shadow: none;
		}
        .el-card {
			border: none;
		}
    }
</style>