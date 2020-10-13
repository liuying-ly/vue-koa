<template>
    <div id="boxs">
        <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :goods-id="goodsId"
                :hide-stock="sku.hide_stock"
                :message-config="messageConfig"
                @add-cart="addCarts"
                @buy-clicked="buyClick"
        >
            <template slot="extra-sku-group" slot-scope="props">
                <el-collapse accordion>
                    <el-collapse-item>
                        <template slot="title">
                            <div style="padding: 0 12px">收获地址：{{address}}</div>
                        </template>
                        <el-radio-group v-model="address" style="padding: 12px">
                            <el-radio style="padding: 8px 0" :label="item.address" v-for="(item,index) in addressList" :key="index">{{item.address}}</el-radio>
                        </el-radio-group>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </van-sku>
    </div>
</template>

<script>
    export default {
        name: "info",
        props: [''],
        data() {
            return {
                addressList:[],
                address:'',
                ruleForm:{},
                show:false,
                goodsId:'',
                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '规格', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                    previewImgUrl: 'https://img.yzcdn.cn/2.jpg', // 用于预览显示的规格类目图片
                                },
                                {
                                    id: '2',
                                    name: '蓝色',
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                                    previewImgUrl: 'https://img.yzcdn.cn/2.jpg',
                                }
                            ],
                            k_s: 's1'// skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 1, // skuId，下单时后端需要
                            price: 100, // 价格（单位分）
                            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                            stock_num: 110 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 2, // skuId，下单时后端需要
                            price: 200, // 价格（单位分）
                            s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
                            stock_num: 210 // 当前 sku 组合对应的库存
                        }
                    ],

                    messages: [
                        {
                            // 商品留言
                            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                            name: '留言', // 留言名称
                            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                            required: '1', // 是否必填 '1' 表示必填
                            placeholder: '' // 可选值，占位文本
                        }
                    ],
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 数据结构见下方文档
                },
                messageConfig: {
                    // 数据结构见下方文档
                }
            }
        },
        methods: {
            addCarts(data){
                console.log(data)
                let sel=data.selectedSkuComb
                let cnt={
                    goodId:data.goodId,
                    message:data.messages.message_0,
                    num:data.selectedNum,
                    name:sel.name,
                    image:sel.imgUrl,
                    price:sel.price,
                    userId:this.$userInfo.ids
                }

                this.$shopCar.push(cnt)
                localStorage.setItem('shopCar',JSON.stringify(this.$shopCar))
                this.$routerGo('/car')
            },
            buyClick(data){
                console.log(data)
            },
            changeShow(form){
                // {
                //     id: '1', // skuValueId：规格值 id
                //         name: '红色', // skuValueName：规格值名称
                //     imgUrl: 'https://img.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                //     previewImgUrl: 'https://img.yzcdn.cn/2.jpg', // 用于预览显示的规格类目图片
                // },
                // {
                //     id: 1, // skuId，下单时后端需要
                //         price: 100, // 价格（单位分）
                //     s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                //     stock_num: 110 // 当前 sku 组合对应的库存
                // },

                let item =JSON.parse(JSON.stringify(form))
                console.log(item)
                this.ruleForm=item
                let list=[{}]
                item.specs.split(',').forEach((val,index)=>{
                    list.push({})
                    list[index].id=item.ids+''+index
                    list[index].s1=item.ids+''+index
                    list[index].name=val
                    list[index].imgUrl=this.$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[index]
                    list[index].previewImgUrl=this.$nodeUrl+'file/getImg?imagePath='+item.images.split(',')[index]
                    list[index].price=100*parseFloat(item.prices.split(',')[index])
                    list[index].stock_num=parseInt(item.nums.split(',')[index])
                })
                console.log(123456978)
                this.goodsId=item.ids
                this.sku.tree[0].v=list
                this.sku.list=list
                this.show=true

            },
            getAddress(){
                let that=this
                this.$api.getAddress({userId:this.$userInfo.ids},res=>{
                    if(res){
                        res.forEach((val,index)=>{
                            that.addressList.push({'address':''})
                            that.addressList[index].address=val.name+val.tel+val.province+val.city+val.county+val.addressDetail
                        })
                        that.address=that.addressList[0].address
                    }
                })
            }
        },
        mounted() {

        },
        created() {
            this.getAddress()
            console.log(1)
        },
    }
</script>

<style scoped lang='scss'>
    #boxs {
        .el-collapse-item__header{
            padding: 0 12px;
        }
    }
</style>