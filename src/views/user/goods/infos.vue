<template>
    <div id="box">


    </div>
</template>

<script>
    export default {
        name: "infos",
        props: [''],
        data() {
            return {
                item:''
            }
        },
        methods: {},
        mounted() {
            this.item=this.$route.query
            console.log(this.item)
        },
        created() {
        },
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>