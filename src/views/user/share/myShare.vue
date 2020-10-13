<template>
    <div id="myShare" >
        <el-button @click="$routerGo('/publishShare')" type="primary" size="mini" plain >分享</el-button>
        <div v-if="tableData.length>0">
            <van-swipe-cell v-for="(query,index) in tableData" :key="index" style="margin-bottom: 1rem;position: relative;">
                <el-card>
                    <img :src="query.userImg?($nodeUrl+'file/getImg?imagePath='+query.userImg):require('@/assets/logo.png')"
                         style="width: 3.2rem;height: 3.2rem;border-radius: 1.6rem">
                   
					<span style="position: absolute; top: 1.4rem; left: 4rem;"> {{query.use}} {{$Time(query.ids).getTime()}}</span>
                    <div style="font-size: 1.4rem;margin-left: 3.5rem;">{{query.text}}</div>
                    <img style="height: 10rem;margin-left: 3.5rem;" v-if="query.imagePath" :src="$nodeUrl+'file/getImg?imagePath='+query.imagePath">
                    
                </el-card>

               <!-- <template slot="right"> -->
                    <van-button square type="danger" @click="deleteS(query,index)" text="删除" style="position: absolute;right: 0.6rem;top: 0.6rem;height: 30px;line-height: 30px;background-color: #FF69B4;border: none;font-size: 1.4rem;padding: 0 10px;border-radius: 3px;" />
                <!-- </template> -->
            </van-swipe-cell>
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
            this.$api.getShare({userId:this.$userInfo().ids},res=>{
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