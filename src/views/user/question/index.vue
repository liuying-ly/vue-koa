<template>
    <div id="index">
        <div v-show="!question" @click="close()" style="float: left;font-size: 14px;">
            <i class="el-icon-arrow-left"  ></i>返回
        </div>
        <p style="text-align: right;font-size: 17px;margin-top: 3rem;margin-right: 40%;">{{index<5?sort[index]:'常见问题'}}</p>

        <div class="heads" style="margin-top: 2rem;padding: 0 1.2rem;font-size: 14px;" v-if="question">
            <div v-for="(item,index) in sort" :key="index">
                <div class="menus"  @click="open(index)">
                    {{item}}
                    <i class="icons el-icon-arrow-right" style="float: right;line-height: 2.2rem"></i>
                </div>
                <el-divider></el-divider>
            </div>
        </div>
        <div v-else>
            {{main[index]}}
        </div>
    </div>
</template>

<script>
    export default {

        name: "index",
        props: [''],
        data() {
            return {
                question:true,
                sort:['发表动态','购买宠物','删除我的动态','查看订单'],
                main:[
                    '进入我的界面，登陆后，点击我的动态后,点击发表动态输入对应的字段后点击发表',
                    '进入商品详情页选择数量，填写备注后点击购买进入支付页，或加入购物车后，选择想要购买的商品点击购买。',
                    '发表动态后，在我的页面点击我的动态，滑动动态进行删除',
                    '进入我的页面，点击我的订单，就可查看各种情况商品的的订单'
                ],
                index:5,
            }
        },
        methods: {
            open(index){
                this.index=index;
                this.question=false
            },
            close(){
                this.index=5;
                this.question=true
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
    #index {
		margin-top: 2.5rem;
        .menus{
            height: 2.2rem;
            line-height: 2.2rem;
			font-size: 16px;
			
        }
        .el-divider--horizontal{
            margin:0.5rem 0;
        }
    }
</style>