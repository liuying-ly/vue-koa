<template>
    <div id="box">
        <admin-menu menuText="Meng宠后台管理系统"  :menuList="menuList" :asideWidth="160" >

            <div slot="menu-ele"><el-button type="danger" @click="backLogins" size="mini" style="position: fixed;right: 30px;top:20px;background:#fff;color: #666;">退出登陆</el-button></div>
            <div slot="main">
                <router-view></router-view>
            </div>
        </admin-menu>
    </div>
</template>

<script>
    import menuList from './menu.js'
    import adminMenu from './menu.vue'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                menuList:menuList,
            }
        },
        methods: {
            backLogins(){
                sessionStorage.setItem('userInfo', '')
                this.$router.push('/admin_login')
            }
        },
        mounted() {
            let userInfo=sessionStorage.getItem('userInfo')
            if(!userInfo||userInfo==='') this.$router.push('/admin_login');
            console.log(userInfo)
        },
        created() {

        },
        components:{
            adminMenu
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        
    }
</style>