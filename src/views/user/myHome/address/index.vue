<template>
    <div id="box">
        <van-address-list
                v-if="!update"
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit">
        </van-address-list>
        <updates :addressInfo="addressInfo" v-else @closeDia="closeDia"></updates>
    </div>
</template>

<script>
    import updates from './update'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                update:false,
                chosenAddressId: '1',
                list: [],
                addressInfo:{}
            }
        },
        methods: {
            closeDia(){
                this.update=false
                this.getAddress()
            },
            onAdd() {
                /* this.$toast('新增地址'); */
                this.addressInfo={}
                this.update=true
            },
            onEdit(item, index) {
                this.addressInfo=this.list[index]
                this.update=true
            },
            getAddress(){
                this.$api.getAddress({userId:this.$userInfo().ids},res=>{
                    if(res){
                        res.forEach((val,index)=>{
                            val.address=val.province+val.city+val.county+val.addressDetail
                        })
                        this.list=res
                    }
                })
            }
        },
        mounted() {
        },
        created() {
            this.getAddress()
        },
        components:{
            updates
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        margin-top: 2.5rem;
		.van-address-list__bottom {
			padding: 0 !important;
		}
		.van-button--round {
			border-radius: 0;
		}
		.van-button--danger {
			background-color: #FF69B4;
			border: none;
		}
    }
</style>