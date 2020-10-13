<template>
    <div id="box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="names" placeholder="请输入商品名称">
                <el-input v-model="ruleForm.names"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="sorts">
                <el-select v-model="ruleForm.sorts" placeholder="请选择">
                    <el-option
                            v-for="item in tableSort"
                            :key="item.ids"
                            :value="item.names">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-table :data="ruleForm.specs">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column label="规格名称">
                    <template slot-scope="scope">
                        <el-input v-model="ruleForm.specs[scope.$index]" placeholder="请输入规格名称"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="库存数量">
                    <template slot-scope="scope">
                        <el-input v-model="ruleForm.nums[scope.$index]" placeholder="请输入库存" style="width: 80%;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="规格价格">
                    <template slot-scope="scope">
                        <!-- <el-input-number :precision="2" :step="0.01" :max="10000" v-model="ruleForm.prices[scope.$index]" placeholder="请输入价格" style=""></el-input-number> -->
						<el-input v-model="ruleForm.prices[scope.$index]" placeholder="请输入价格" style="width: 80%;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="规格图片">
                    <template slot-scope="scope" >
                        <div style="width: 100px;height: 110px">
                            <img width="60px" height="60px" v-if="ruleForm.images[scope.$index]" :src="$nodeUrl+'file/getImg?imagePath='+ruleForm.images[scope.$index]">
                            <upSpe :zidong="update" style="width: 60px;height: 60px" v-else   :index="scope.$index"
                                   :ref="'upImg'+scope.$index" @change="changeImg" @success="successImg"></upSpe>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="添加/取消规格">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="adds(scope.$index+1)" round plain class="el-icon-plus"></el-button>
                        <el-button type="danger" size="small" v-if="ruleForm.specs.length>1" @click="deletes(scope.$index)" round plain class="el-icon-minus"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="!update" style="margin:10px 40px 0 240px;">添加</el-button>
                <el-button type="primary" @click="updateForm('ruleForm')" v-else>修改</el-button>
                <el-button @click="$emit('closeDia','')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import upSpe from './upImg'
    export default {
        name: "createGoods",
        props: ['ruleForm','update'],
        data() {
            return {
                rules: {
                    names: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
                },
                file:[],
                tableSort:[]
            }
        },
        methods: {
            adds(index){
                let form=this.ruleForm
                form.nums.splice(index,0,'')
                form.specs.splice(index,0,'')
                form.prices.splice(index,0,'')
                form.images.splice(index,0,'')
            },
            deletes(index){
                let form=this.ruleForm
                form.nums.splice(index,1)
                form.specs.splice(index,1)
                form.prices.splice(index,1)
                form.images.splice(index,1)
            },
            changeImg(file,index){
                this.file[index]=file
            },
            successImg(path,index){
                this.ruleForm.images[index]=path
                if(!this.update){
                    if(index<this.ruleForm.specs.length-1){
                        this.$refs['upImg'+parseInt(index+1)].submits()
                    }else{
                        let form=JSON.parse(JSON.stringify(this.ruleForm))
                        form.nums=form.nums.toString()
                        form.specs=form.specs.toString()
                        form.prices=form.prices.toString()
                        form.images=form.images.toString()
                        this.$api.addGoods(form,res=>{
                            this.$emit('closeDia',form)
                            if(res) this.$router.go(0)
                        })
                    }
                }

            },
            submitForm(){
                let that=this
                let p= function(){
                    let form=that.ruleForm
                    let c=true
                    if(!form.names||!form.sorts){
                        c=false
                    }
                    for(let i=0;i<form.specs.length;i++){
                        if(form.specs[i]&&that.file[i]&&form.nums&&form.prices){
                        }else{
                           c= false
                        }
                    }
                    console.log(form)
                    return c
                }

                if(p()){
                    console.log(123456)
                    console.log(this.$refs)
                    this.$refs['upImg0'].submits()
                }else{
                    that.$message.error('请填写完整')
                }
            },
            updateForm(){
                let that=this
                let p= function(){
                    let form=that.ruleForm
                    let c=true
                    if(!form.names||!form.sorts){
                        c=false
                    }
                    for(let i=0;i<form.specs.length;i++){
                        if(form.specs[i]&&that.file[i]&&form.nums&&form.prices){
                        }else{
                            c= false
                        }
                    }
                    return c
                }
                if(p()){
                    let form=JSON.parse(JSON.stringify(this.ruleForm))
                    form.nums=form.nums.toString()
                    form.specs=form.specs.toString()
                    form.prices=form.prices.toString()
                    form.images=form.images.toString()
                    this.$api.delGoods({ids:form.ids},res=>{
                        if(res){
                            this.$api.addGoods(form,r=>{
                                if(r){
                                    this.$emit('closeDia',form)
                                    that.$message.success('修改成功')
                                }
                            })
                        }
                    })
                }else{
                    that.$message.error('请填写完整')
                }
             }
        },
        mounted() {
            console.log(this.ruleForm)
            if(!this.update){
                this.ruleForm.ids=Date.now()
            }
            if(this.ruleForm.images[0]){
                this.ruleForm.images.forEach((val,index)=>{
                    this.file[index]=val
                })
            }
        },
        created() {
            this.$api.getSort({},res=>{
                if(res) this.tableSort=res

            })

        },
        components:{
            upSpe
        }
    }
</script>

<style  lang='scss'>
    #box {
        .avatar-uploader .el-upload {
			width: 110px;
			height: 110px;
		}
		.avatar-uploader-icon {
			width: 28px;
			height: 28px;
			margin: 41px;
		}
		.el-button.is-round {
			color: #606266;
			background: #fff;
		}
    }
</style>