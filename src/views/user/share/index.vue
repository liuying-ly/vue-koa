<template>
    <div id="myShare" >
        <el-button @click="$userInfo().username?$routerGo('/publishShare'):($toast('请先登陆'),$routerGo('/login'))" type="primary" size="mini" plain >分享</el-button>
        <div v-if="tableData.length>0">
                <el-card v-for="(query,index) in tableData" :key="index" style="margin-bottom: 1rem">
                    
                    <div @click="$routerGo('/shareInfo',query)" style="position: relative;">
                        <img :src="query.userImg?($nodeUrl+'file/getImg?imagePath='+query.userImg):require('@/assets/logo.png')"
                             style="width: 3.2rem;height: 3.2rem;border-radius: 1.6rem">
                        <span style="position: absolute; top: 1rem; left: 3.5rem;">{{query.use}} {{$Time(query.ids).getTime()}}</span>
                        <div style="font-size: 1.4rem;margin-left: 3.5rem;">{{query.text}}</div>
                        <img style="height: 10rem; margin-left: 3.5rem; " v-if="query.imagePath" :src="$nodeUrl+'file/getImg?imagePath='+query.imagePath">
                    </div>
                </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myShare",
        props: [''],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {
            deleteS(query,index){
                this.$api.delShare({ids:query.ids},res=>{
                    if(res){
                        this.$toast('删除成功')
                        this.tableData.splice(index,1)
                    }

                })
            }
        },
        mounted() {
            this.$api.getShare({},res=>{
                if(res)this.tableData=res
            })
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #myShare {
        margin-top: 2.5rem;
		.el-button--primary.is-plain{
			color: #fff;
			background: hotpink;
			border: 0;
		}
		.el-button{
			position: fixed;
			top: 2px;
			right: 0;
			z-index: 99999;
			margin-right: 0 !important;
		}

    }
</style>
