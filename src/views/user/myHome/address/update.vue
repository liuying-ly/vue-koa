<template>
    <div id="box">
        <van-address-edit
                :area-list="areaList"
                show-search-result
                :address-info="addressInfo	"
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                show-delete
                @delete="onDelete"
                @save="onSave">
        </van-address-edit>
    </div>
</template>

<script>
    import area from './area'
    export default {
        name: "update",
        props: ['addressInfo'],
        data() {
            return {
                areaList:area,
                searchResult: []
            }
        },
        methods: {
            onSave(cnt) {
                let val=JSON.parse(JSON.stringify(cnt))
                this.$toast('save');
                console.log(val)
                if(!val.id){
                    val.id=Date.now()
                    val.userId=this.$userInfo().ids
                    this.$api.addAddress(val,res=>{
                        if(res){
                            this.$toast('添加成功')
                            this.$emit('closeDia')
                        }
                    })
                }else{
                    delete val._id
                    this.$api.upAddress(val,res=>{
                        if(res){
                            this.$toast('修改成功')
                            this.$emit('closeDia')
                        }
                    })
                }


            },
            onDelete(val){
                console.log(val)
                this.$api.delAddress({id:val.id},res=>{
                    if(res){
                        this.$toast('删除成功')
                        this.$emit('closeDia')
                    }
                })
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
        .van-button--danger {
			background-color: #FF69B4 !important;
		}
    }
</style>
<style  lang='scss'>
        .van-address-edit__buttons button {
			background-color: #FF69B4 !important;
			border: 1px solid #FF69B4 !important;
			width: 49%;
			float: left;
			height: 35px;
			line-height: 32px;
		}
		.van-address-edit__buttons button:last-child {
			float: right;
			color: #fff;
		}
</style>