<template>
    <div id="myShare" v-if="query">
            <el-card style="position: relative;">
				<img :src="query.userImg?($nodeUrl+'file/getImg?imagePath='+query.userImg):require('@/assets/logo.png')" style="width: 3.2rem;height: 3.2rem;border-radius: 1.6rem">                
				<span style="position: absolute; top: 1.3rem; left: 4rem;">{{query.user}}  {{$Time(query.ids).getTime()}}</span>
				<div style="font-size: 1.4rem;margin-left: 3.5rem;">{{query.text}}</div>
				<img style="height: 10rem;margin-left: 3.5rem;" v-if="query.imagePath" :src="$nodeUrl+'file/getImg?imagePath='+query.imagePath">
				
            </el-card>
        <comment :share-id="query.ids"></comment>
        </div>
</template>

<script>
    import comment from './comment'
    export default {
        name: "myShare",
        props: [''],
        data() {
            return {
                query:false
            }
        },
        methods: {
        },
        mounted() {
            this.query=this.$route.query
        },
        created() {
        },
        components: {comment},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #myShare {
         margin-top: 2.5rem;
    }
</style>