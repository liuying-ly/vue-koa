<template>
    <div id="box">
        <el-dialog
                :visible.sync="dialogVisible"
                width="70%">
            <createGoods :update="update" @closeDia="closeDia" :ruleForm="ruleForm"></createGoods>
        </el-dialog>
        <el-button plain round type="primary" @click="addGoods">添加商品</el-button>
        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="names" label="名称"></el-table-column>
            <el-table-column prop="sorts" label="分类"></el-table-column>
            <el-table-column prop="prices" label="价格">
                <template slot-scope="scope">
                    {{scope.row.prices.split(',')[0]}}
                </template>
            </el-table-column>
            <el-table-column prop="nums" label="库存数量">
                <template slot-scope="scope">
                    {{sums(scope.row.nums.split(','))}}
                </template>
            </el-table-column>
            <el-table-column prop="password" label="添加时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>
            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain round @click="upSort(scope.$index,scope.row)">修改</el-button>
                    <el-button type="warning" plain round @click="delSort(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import createGoods from './createGoods'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                dialogVisible:false,
                tableSort:[],
                tableData:[],
                ruleForm:{
                    names:'',
                    sorts:'',
                    prices:[0.00],
                    nums:[0],
                    images:[''],
                    specs:[''],
                    describe:'',
                },
                update:true,
                index:0,
                names:'',
            }
        },
        methods: {
            closeDia(row){
                if(row){
                    if(this.update){
                        this.tableData.splice(this.index,1,row)
                    }else{
                        this.tableData.splice(this.index,0,row)
                    }
                }
                this.dialogVisible=false
            },
            addGoods(){
                this.dialogVisible=true
                this.update=false
            },
            sums(arr){
                var s = 0;
                for (var i=arr.length-1; i>=0; i--) {
                    s += parseInt(arr[i]);
                }
                return s;
            },
            upSort(index,row){
                // ruleForm:{
                //     names:'',
                //         sorts:'',
                //         prices:[0.00],
                //         nums:[0],
                //         images:[''],
                //         specs:[''],
                //         describe:'',
                // },
                this.update=true
                this.index=index
                let form = this.ruleForm
                form.ids=row.ids
                form.names=row.names
                form.sorts=row.sorts
                form.nums=row.nums.split(',')
                form.images=row.images.split(',')
                form.specs=row.specs.split(',')
                this.dialogVisible=true
            },
            delSort(index,row){
                this.$api.delGoods({ids:row.ids},res=>{
                    if(res){
                        this.tableData.splice(index,1)
                    }

                })
            }

        },
        mounted() {
        },
        created() {

            this.$api.getGoods({},res=>{
                if(res) this.tableData=res

            })
        },
        components:{
            createGoods
        },
        watch:{
            names(news){
                let cnt
                if(news){cnt={"names":{"$regex":news}}}
                else{cnt={}}
                this.$api.getGoods(cnt,res=>{
                    if(res){
                        this.tableData=res
                    }
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>