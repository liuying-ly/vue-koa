<template>
    <div id="publish">
        <div style="font-size: 1.5rem;margin-bottom: 0.5rem;color: #8C939D;">点击添加图片</div>
        <div style="width: 7rem;height: 7rem;">
            <up-img :auto-upload="true" @success="success"></up-img>
        </div>

        <van-field
                style="margin-top: 4rem"
                v-model="text"
                center
                clearable
                rows="5"
                show-word-limit
                autosize
                type="textarea"
                placeholder="请输入内容"
        >
            <van-button :disabled ="text===''" slot="button" size="small" type="primary" @click="submits()" style="position: fixed;top: 3rem;right: 0.4rem;background-color: #FF69B4;border: none;">
                发表
            </van-button>
        </van-field>
    </div>
</template>

<script>
    export default {
        name: "publish",
        props: [''],
        data() {
            return {
                query:false,
                text:'',
                cnt:{
                    imagePath:'',
                    use:this.$userInfo().names,
                    userImg:this.$userInfo().userImg
                }
            }
        },
        methods: {
            success(path){
                this.cnt.imagePath=path
            },
            submits(){
                let query =JSON.parse(JSON.stringify(this.cnt))
                query.text=this.text
                query.userId=this.$userInfo().ids
                query.ids=Date.now()
                delete query._id;
                this.$api.addShare(query,res=>{
                    if(res) {
                        this.$toast('分享成功')
                        this.$routerGo('/share')
                    }
                })
            }
        },
        mounted() {

        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #publish {
         margin-top: 2.5rem;
		 .van-cell {
			 padding: 10px 8px;
		 }
    }
</style>