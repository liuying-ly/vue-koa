<template>
    <div id="box">
        <div style="width: 10rem;margin: 0 auto">
            <usetImg @success="success" :imageUrl="imageUrl"></usetImg>
        </div>

        <van-form @submit="onSubmit" style="margin-top: 1rem">
            <van-field
                    v-model="form.username"
                    name="username"
                    label="账号  :"
                    :disabled="true"
            ></van-field>
            <van-field
                    v-model="form.names"
                    name="names"
                    label="用户名  :"
                    placeholder="请填用户名"
                    :rules="[{ required: true, message: '请填用户名' }]">
            </van-field>
            <van-field
			        :type="passwordType"
                    v-model="form.password"
                    name="password"
                    label="密码  :"
                    placeholder="请填写密码"
                    :rules="[{ required: true, message: '请填写密码' }]">

            </van-field>
			<span class="show-pwd" >
			    <i :class="passwordType === 'password' ? 'iconfont course_yanjing_bi' : 'iconfont course_yanjing_kai'"/>
			</span>
            <div style="margin: 16px;">
                <van-button  block type="info" native-type="submit" style="background: #FF69B4; border: none;">
                    修改
                </van-button>


                <van-button  block style="margin-top: 20px;background: #FF69B4; border: none;" type="danger" @click="signUp" >
                    退出登陆
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>

    import usetImg from './upImg'
    export default {
        name: "info",
        props: [''],
        data() {
            return {
				passwordType: 'password',
                form:JSON.parse(JSON.stringify(this.$userInfo())),
                imageUrl:this.$userInfo().userImg?this.$nodeUrl+'file/getImg?imagePath='+this.$userInfo().userImg:''
            }
        },
        methods: {
            success(path){
                //this.imageUrl=this.$nodeUrl+'file/getImg?imagePath='+this.$userInfo.userImg
                console.log(path)
                this.form.userImg=path
                // let cnt={
                //     ids:this.$userInfo().ids,
                //     userImg:path
                // }
                // this.$api.upUser(cnt,res=>{
                //     if(res){
                //         this.$toast('修改成功')
                //         sessionStorage.setItem('userInfo',JSON.stringify(this.$userInfo()))
                //     }
                // })
            },
            onSubmit(values) {
                let cnt=JSON.parse(JSON.stringify(this.form))
                this.$api.upUser(cnt,res=>{
                    if(res){
                        this.$toast('修改成功')
                        this.$userInfo(cnt)
                    }
                })
            },
            signUp(){
                this.$userInfo('clear')
                this.$routerGo('/my')
            }
        },
        mounted() {
            if(!this.$userInfo().username){
                this.$routerGo('/my')
            }
        },
        created() {

        },
        components:{
            usetImg
        }
    }
</script>

<style scoped lang='scss'>
    #box {
       margin-top: 2.5rem;
    }
	.show-pwd {
	    position: absolute;
	    right: 10px;
	    top: 7px;
	    font-size: 16px;
	    color: grey;
	    cursor: pointer;
	    user-select: none;
	}
</style>