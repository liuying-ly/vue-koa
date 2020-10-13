<template>
    <div id="box">
        <div class="mains">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item name="/home" icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item name="/changShi" icon="browsing-history">常识</van-tabbar-item>
            <van-tabbar-item name="/share" icon="chat">宠圈</van-tabbar-item>
            <van-tabbar-item name="/car" icon="shopping-cart">购物车</van-tabbar-item>
            <van-tabbar-item name="/my" icon="manager">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    import heads from './heads'
    export default {
        name: "foot",
        props: [''],
        data() {
            return {
                active: '/home'
            }
        },
        methods: {},
        mounted() {
            this.active=this.$route.fullPath
        },
        created() {
        },
        watch:{
            '$route' (to, from) {
                this.active=to.fullPath
            },
            active(news){
                this.$routerGo(news)
            }
        },
        components:{
            heads
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        .van-tabbar--fixed{
            background-color: #fafafa;
        }

        .van-tabbar-item--active{
            color: hotpink;
        }


    }
</style>