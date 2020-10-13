<template>
    <div id="box">
        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="ids" label="单号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="message" label="备注"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="grade" label="价格">
                <template slot-scope="scope">
                    {{scope.row.price/100}}
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="状态">
                <template slot-scope="scope">
                    {{headL[parseInt(scope.row.status)]}}
                </template>
            </el-table-column>

            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" v-if="scope.row.status==='1'" size="small" round plain @click="onSubmit('2',scope.row,scope.$index)">发货</el-button>
                    <el-button type="danger" v-if="scope.row.status==='1'" size="small" round plain @click="onSubmit('4',scope.row,scope.$index)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                headL:['待支付','待发货','待收货','已收获','已取消订单'],
                tableData:[]
            }
        },
        methods: {
            onSubmit(status,row,index){
                console.log(row)

                this.$api.upPay({ids:row.ids,status:status},res=>{
                    if(res){
                        /* this.$toast('发货成功') */
                        let item=JSON.parse(JSON.stringify(row))
                        item.status=status
                        this.tableData.splice(index,1,item)
                        let cnt={
                            ids:row.goodId
                        }
                        this.getGoods(cnt,row.num)
                    }
                })
            },
            getGoods(cnt,num){
                this.$api.getGoods(cnt,res=>{
                    if(res) {
                        let tableData=res
                        let nums =res[0].nums.split(',')
                        for(let i=0;i<nums.length;i++){
                            if(nums[i]>num){
                                nums[i]=nums[i]-num
                                console.log(nums[i])
                                break;
                            }
                        }
                    cnt.nums=nums.toString()
                        this.$api.upGoods(cnt,res=>{})
                    }
                })
            }
        },
        mounted() {
        },
        created() {
            this.$api.getPay({},res=>{
                if(res){
                    this.tableData=res
                }
            })
        },
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>