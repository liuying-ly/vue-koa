<template>
    <div id="boxSS">
        <van-nav-bar
                style="background-color: hotpink"
                left-text="返回" left-arrow
                       @click-right="$routerGo('/')">
            <div slot="right" style="color:#ffffff">
                <img src="@/assets/logo.png" style="width: 2.2rem;height: 2.2rem;margin-top: 0.5rem;border-radius: 1.1rem;position: relative;top:0.7rem">
            </div>

            <div slot="left"
                 v-show="fullPath!=='/home'&&fullPath!=='/my'&&fullPath!=='/car'&&fullPath!=='/changShi'&&fullPath!=='/share'"
                 style="color:#ffffff"  @click="onClickLeft()">
                <van-icon name="arrow-left" />
            </div>

            <div slot="title">
                Meng 宠
            </div>
        </van-nav-bar>
            <!--<van-search-->
                    <!--v-model="names"-->
                    <!--shape="round"-->
                    <!--@search="search"-->
                    <!--background="#7fecb3"-->
                    <!--placeholder="请输入搜索关键词">-->
            <!--</van-search>-->
        <div v-show="fullPath==='/home'||fullPath==='/goods'" style="height: 2.5rem ;width: 80%;padding:0.1rem 10%;background-color: hotpink;">
            <el-input v-model="names"
                      @change="search"
                      placeholder="请输入商品名称"
                      size="mini"
					  style="">
            </el-input>
        </div>

    </div>
</template>

<script>
    export default {
        name: "heads",
        props: [''],
        data() {
            return {
                hasReturn:false,
                showSearch:false,
                names:'',
                fullPath:this.$route.fullPath
            }
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)//返回上一层
                    :  this.$routerGo('/home')//返回首页
            },
            onClickRight(){
                this.showSearch=!this.showSearch
            },
            search(val){
                this.$routerGo('/goods','',call=>{
                    this.$center.$emit('changeName',val)
                })
            }
        },
        mounted() {
            this.fullPath=this.$route.fullPath.split('?')[0]
        },
        created() {
        },
        watch:{
            '$route' (to, from) {
                this.hasReturn = window.history.length > 1;
				 setTimeout(()=>{
					this.fullPath=this.$route.fullPath.split('?')[0]
				})

            },
            names(news){
                this.$center.$emit('changeNames',news)
            }

        },

    }
</script>

<style scoped lang='scss'>
    #boxSS {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 999;
        .van-nav-bar__title{
            color:#ffffff;
        }
        .van-nav-bar{
            background-color: hotpink;

            height: 2.5rem;
            line-height: 2.5rem;
        }
        .van-search{
            height: 2.5rem;
            line-height: 2.5rem;
        }
        .van-search__content--round{
            height: 2.5rem;
            line-height: 1.5rem;
        }

        .van-field__control{
            height: 2rem;
            line-height: 1.5rem;
            position: fixed;
            top:-1rem;
        }
        .van-nav-bar .van-icon{
            color:#ffffff;
        }

        [class*=van-hairline]::after{
            border: 0 !important;
        };

    }
</style>

<style lang="scss">
    #box{
		.el-input__inner{
			height: 1.6rem !important;
			line-height: 1.6rem !important;
			border-radius: 0.9rem !important;
		}
    }

</style>
