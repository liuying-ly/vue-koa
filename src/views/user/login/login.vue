<template>
    <div id="box">
        <!-- <img src="@/assets/bgc5.jpg" style="height: 98vh;" > -->
        <div style="width: 100%;height: 100vh;position: absolute;top: 0">
            <div style="width: 70%;margin: 0 auto;margin-top: 18rem;">
                <van-cell-group>
                    <van-field style="border: 1px solid #FF69B4;margin-bottom: 10px;" v-model="username" placeholder="请输入账号" />
                    <van-field style="border: 1px solid #FF69B4;" type="password" v-model="password" placeholder="请输入密码" />
                </van-cell-group>
                <div style="width: 100%;height: 3.5rem">
                    <el-button type="text" style="margin-bottom: 10px;color: #FF69B4;border: none;" @click="$routerGo('/signUp')">注册</el-button>
                   <!-- <el-button type="text" style="float: right" @click="$routerGo('/admin_login')">管理员登陆</el-button> --> 
                </div>
                <el-button type="success" round style="color: #fff; width: 100%;height: 3rem;font-size: 1.5rem;background: #FF69B4;border: none;border-radius: 0;margin-left: 0;" @click="login" > 登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        props: [''],
        data() {
            return {
                username:'',
                password:'',
            }
        },
        methods: {
            login(){
                if(this.username&&this.password){
                    let cnt={
                        username:this.username,
                        password:this.password,
                    }
                    this.$api.login(cnt,res=>{
                        if(res.length>0){
                            console.log(res)
                            this.$userInfo(res[0])
                            setTimeout(()=>{
                              this.$router.go(0)
                            })
                            this.$routerGo('/my')
                        }else {
                            this.$toast('密码错误')
                        }
                    })
                }else{
                    this.$toast('请输入完整')
                }
            }
        },
        mounted() {
        },
        created() {
            if(this.$userInfo().username){
                this.$routerGo('/my')
            }
        },
    }
</script>

<style scoped lang='scss'>
    #box {
		margin-top: 2.5rem;
        overflow: hidden !important;
        height:81vh;
        .inputs{
            margin-top: 2rem;
        }
    }
</style>