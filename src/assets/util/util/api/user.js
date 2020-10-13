import {util} from '../util.js'

let user={}
let src='user/' //当前接口文件夹
user.login=function(data,callback) {
    util(data,src+'login',callback)
}
//user.adminlogin=function(data,callback) {
  //  util(data,src+'adminlogin',callback)
//}
user.addUser=function(data,callback) {
    util(data,src+'addUser',callback)
}
user.upUser=function(data,callback) {
    util(data,src+'upUser',callback)
}
user.getUser=function(data,callback) {
    util(data,src+'getUser',callback)
}

user.addAdmin=function(data,callback) {
    util(data,src+'addAdmin',callback)
}
user.upAdmin=function(data,callback) {
    util(data,src+'upAdmin',callback)
}
user.deAdmin=function(data,callback) {
    util(data,src+'deAdmin',callback)
}
user.getAdmin=function(data,callback) {
    util(data,src+'getAdmin',callback)
}
user.addSort=function(data,callback) {
    util(data,src+'addSort',callback)
}
user.upSort=function(data,callback) {
    util(data,src+'upSort',callback)
}
user.deSort=function(data,callback) {
    util(data,src+'deSort',callback)
}
user.getSort=function(data,callback) {
    util(data,src+'getSort',callback)
}

user.getPay=function(data,callback) {
    util(data,src+'getPay',callback)
}
user.upPay=function(data,callback) {
    util(data,src+'upPay',callback)
}
user.delPay=function(data,callback) {
    util(data,src+'delPay',callback)
}
user.addPay=function(data,callback) {
    util(data,src+'addPay',callback)
}

user.getGoods=function(data,callback) {
    util(data,src+'getGoods',callback)
}
user.upGoods=function(data,callback) {
    util(data,src+'upGoods',callback)
}
user.delGoods=function(data,callback) {
    util(data,src+'delGoods',callback)
}
user.addGoods=function(data,callback) {
    util(data,src+'addGoods',callback)
}

user.getSpecs=function(data,callback) {
    util(data,src+'getSpecs',callback)
}
user.upSpecs=function(data,callback) {
    util(data,src+'upSpecs',callback)
}
user.delSpecs=function(data,callback) {
    util(data,src+'delSpecs',callback)
}
user.addSpecs=function(data,callback) {
    util(data,src+'addSpecs',callback)
}

user.addAddress=function(data,callback) {
    util(data,src+'addAddress',callback)
}
user.getAddress=function(data,callback) {
    util(data,src+'getAddress',callback)
}
user.delAddress=function(data,callback) {
    util(data,src+'delAddress',callback)
}
user.upAddress=function(data,callback) {
    util(data,src+'upAddress',callback)
}

user.getComment=function(data,callback) {
    util(data,src+'getComment',callback)
}
user.addComment=function(data,callback) {
    util(data,src+'addComment',callback)
}
user.delComment=function(data,callback) {
    util(data,src+'delComment',callback)
}

user.addShare=function(data,callback) {
    util(data,src+'addShare',callback)
}
user.getShare=function(data,callback) {
    util(data,src+'getShare',callback)
}
user.upShare=function(data,callback) {
    util(data,src+'upShare',callback)
}
user.delShare=function(data,callback) {
    util(data,src+'delShare',callback)
}
user.selectShare=function(data,callback) {
    util(data,src+'selectShare',callback)
}

user.addShareComment=function(data,callback) {
    util(data,src+'addShareComment',callback)
}

user.getShareComment=function(data,callback) {
    util(data,src+'getShareComment',callback)
}





export default user
