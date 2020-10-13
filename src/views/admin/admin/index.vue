<template>
    <div id="box">
        <el-button plain round type="primary" @click="dialogVisible=true">添加</el-button>

        <el-dialog
        :visible.sync="dialogVisible"
        width="40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="账号" prop="adminaccount">
                    <el-input v-model="ruleForm.adminaccount"></el-input>
                </el-form-item>
				<el-form-item label="密码" prop="adminpassword">
				    <el-input :type="passwordType" v-model="ruleForm.adminpassword"></el-input>
					<span class="show-pwd">
					    <i :class="passwordType === 'password' ? 'iconfont course_yanjing_bi' : 'iconfont course_yanjing_kai'"/>
					</span>
				</el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-if="!update">添加</el-button>
                    <el-button type="primary" @click="updateForm('ruleForm')" v-else>修改</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table :data="tableData">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="adminaccount" label="管理员账号"></el-table-column>
			<el-table-column prop="adminpassword" label="管理员密码" style="color: #fff;">......</el-table-column>
            <el-table-column prop="password" label="添加时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>
            <el-table-column prop="password" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain round @click="upAdmin(scope.$index,scope.row)">修改</el-button>
                    <el-button type="warning" plain round @click="delAdmin(scope.$index,scope.row)">删除</el-button>
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
                dialogVisible:false,
                ruleForm: {
                    adminaccount: 'admin',
					adminpassword: '123',
                },
				passwordType: 'password',
                update:false,
                index:'',
                tableData:[],
                rules: {adminaccount: [{ required: true, message: '请输入账号', trigger: 'blur' },]},
				rules: {adminpassword: [{ required: true, message: '请输入密码', trigger: 'blur' },]}
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let cnt={
                            adminaccount:this.ruleForm.adminaccount,
							adminpassword:this.ruleForm.adminpassword,
                            ids:Date.now()
                        }
                       this.$api.addAdmin(cnt,res=>{
                           if(res){
                               this.$message.success('添加成功') 
                                this.tableData.splice(0,0,cnt)
                               this.dialogVisible=false
                           }
                       })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let cnt=JSON.parse(JSON.stringify(this.ruleForm))
                        this.$api.upAdmin(cnt,res=>{
                            if(res){
                                 this.$message.success('修改成功') 
                                this.tableData.splice(this.index,1,cnt)
                                this.dialogVisible=false
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            upAdmin(index,row){
                this.ruleForm=JSON.parse(JSON.stringify(row))
                this.index=index
                this.update=true
                this.dialogVisible=true
            },
            delAdmin(index,row){
                let cnt=JSON.parse(JSON.stringify(row))
                this.$api.deAdmin(cnt,res=>{
                    if(res){
                        this.tableData.splice(index,1)
                         this.$message.success('删除成功') 
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible=false
            },
			
        },
        mounted() {
        },
        created() {
            /* this.$api.adminlogin({},res=>{
                 if(res){
                     this.tableData=res
                 }
             }) */
            this.$api.getAdmin({},res=>{
                if(res) this.tableData=res

            }) 
        },
        components:{
            /* createAdmin */
        }
    }
</script>

<style scoped lang='scss'>
    #box {
        .demo-ruleForm{
            width: 90%;
            margin: 0 5%;
        }
		.el-button {
			margin-left: 0;
		}
		.el-button--primary.is-plain {
		    background: #fff;
		    border-color: #FF69B4;
		    color: #666;
		}
		.el-button--primary.is-plain:hover {
		    background: #FF69B4;
		    color: #fff;
		}
		.el-button.is-round {
		    padding: 8px 17px;
		}
    }
</style>
<style lang='scss'>
    #box {
    
        .el-input__inner {
			height: 2.5rem !important;
			border: 1px solid #FF69B4 !important;
			border-radius: 0.5rem !important;
		}
		.el-button--primary {
			color: #606266;
		    background-color: #fff;
		    border-color: #FF69B4;
		}
		.el-button--primary:hover {
		    background-color: #FF69B4;
		    border-color: #fff;
		}
		.el-button {
			background-color: #fff;
			color: #606266;
		    margin-right: 2rem;
			border: 1px solid #FF69B4;
		}
		.el-button:hover {
		    background-color: #FF69B4;
		    border-color: #fff;
			color: #fff;
		}
    }
</style>