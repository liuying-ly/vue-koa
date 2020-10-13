import Time from './Time'
import routerGo from './routerGo'
import userInfo from './userInfo'
import adminInfo from './adminInfo'
import {api} from '../util/util'
import nodeUrl from '../util/url'
import components from './components'
import ver from './ver'
import area from './area'
function fun(Vue,options) {
    Vue.use(components)

    Vue.prototype.$Time=function(date){ //获取时间
        return new Time(date)
    }
    Vue.prototype.$routerGo=routerGo  //跳转页面

    Vue.prototype.$center=new Vue;//组件间通信

    Vue.prototype.$userInfo=userInfo;//用户信息
    Vue.prototype.$adminInfo=adminInfo;//管理员信息

    Vue.prototype.$api=api;//接口清单

    Vue.prototype.$nodeUrl=nodeUrl//后台地址

    Vue.prototype.$JSP=function (data) {
        return JSON.parse(JSON.stringify(data))
    }    //  对象不指向同一地址拷贝

    Vue.prototype.$ver=ver//element 表单验证

    Vue.prototype.$area=area//全国省市

}
export default fun
