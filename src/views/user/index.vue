<template>
    <div id="box">
        <heads></heads>
        <div class="mains">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import foots from './foot'
    import heads from './heads'
    export default {
        name: "index",
        props: [''],
        data() {
            return {}
        },
        methods: {},
        mounted() {
        },
        created() {
        },
        components:{
            foots,heads
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        .mains{
            width: 98%;
            margin: 1% 1% 60px 1%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>