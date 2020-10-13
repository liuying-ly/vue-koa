<template>
    <div id="box">
        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="names" label="用户名"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="password" label="注册时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="grade" label="权限">
                <template slot-scope="scope">
                    {{scope.row.grade}}
                </template>
            </el-table-column>
            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="upUser('管理员',scope.$index,scope.row)" v-if="scope.row.grade==='普通用户'">设为管理员</el-button>
                    <el-button type="text" @click="upUser('普通用户',scope.$index,scope.row)" v-else>取消管理员</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {
            /* upUser(grades,index,row){
                let cnt={
                    grade:grades,
                    ids:row.ids
                }
                this.$api.upUser(cnt,res=>{
                    if(res){
                        this.$message.success('修改成功') 
                        let c=JSON.parse(JSON.stringify(this.tableData[index]))
                        c.grade=grades
                        this.tableData.splice(index,1,c)
                    }
                })
            } */
        },
        mounted() {
        },
        created() {
             this.$api.login({},res=>{
                if(res){
                    this.tableData=res
                }
            }) 
			/* this.$api.getUser({},res=>{
			    if(res) this.tableData=res
			
			}) */
        },
    }
</script>

<style scoped lang='scss'>
    #box {

    }
</style>