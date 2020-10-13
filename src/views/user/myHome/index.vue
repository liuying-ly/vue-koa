<template>
    <div id="box">
        <div class="heads users"  v-if="$userInfo().username" @click="$routerGo('myInfo')">
            <div style="width: 7rem;height:7rem;">
                <user-image borderRadius="3.5rem" width="7rem" height="7rem" :src="$userInfo().userImg" style="width: 7rem;height: 7rem;margin-left: 4rem;"></user-image>
            </div>
            <div style="font-size: 1.8rem;height: 2rem;">{{$userInfo().names}}</div>
        </div>
        <div class="heads users" v-else @click="$routerGo('/login')">
            <div class="block" style="">
                <el-avatar :size="40" class="el-icon-user-solid" ></el-avatar>
            </div>
            <div style="font-size: 1.8rem;width: 15rem;height: 2rem;">登陆/注册</div>
        </div>

        <van-grid>
            <van-grid-item icon="chat-o" text="我的宠圈"  @click="toMy('/myShare')" />
            <van-grid-item icon="star-o" text="我的收藏" @click="toMy('/collect') "/>
            <van-grid-item icon="gift-o" text="我的订单" @click="toMy('/pay')" />
            <van-grid-item icon="location-o" text="我的地址" @click="toMy('/address')" />
            <van-grid-item icon="comment-circle-o" @click="toMy('/myComment')" text="我的评价" />
            <van-grid-item icon="question-o"  @click="$routerGo('/question')" text="常见问题" />
            <van-grid-item icon="service-o" text="联系客服" @click="kefu()" />
        </van-grid>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "index",
        props: [''],
        data() {
            return {}
        },
        methods: {
            toMy(path){
                    if(this.$userInfo().username){
                        this.$routerGo(path)
                    }else{
                        Toast('请先登陆')
                    }
            },
            kefu(){
                let qq=847094814
                this.$notify({ type: 'primary', message: '请联系qq ：847094814' ,duration: 0});
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
		margin-top: 5rem;
        .heads{
            width: 96%;
            /* padding: 2% !important; */
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            border: 1px solid #EBEEF5;
        }
        .user{
            height: 3.5rem;
        }
        .menus{
            padding: 0 1rem;
            font-size: 1rem;
            height: 1.8rem;
            line-height: 1.8rem;
            &:active{
                background-color: #ff867a;
            }
        }
        .icons{
            color: dodgerblue;
            font-size: 1rem;
            line-height: 1.8rem;
        }
        .el-divider--horizontal{
            margin:0.5rem 0;
        }
        .users{
            width: 15rem;
			text-align: center;
            margin: 2rem auto;
            box-shadow:0 0 0 0 ;
            border: 0;
			.block{
				span{
					width: 7rem !important;
					height: 7rem !important;
					line-height: 7rem !important;
					font-size: 40px;
				}
			}
        }
    }
</style>

<style lang="scss">
    .el-notification{
		top: 30% !important;
        width: 80%;
        left:7% !important;
		padding: 30px 30px !important;
		border: 1px solid #FF69B4 !important;
    }
    .el-notification.right{
        left:7%;
    }
	.el-notification__content {
		font-size: 18px !important;
	}
</style>