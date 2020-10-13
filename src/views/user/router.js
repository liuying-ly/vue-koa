
import index from './index'
import foot from './foot'

import my from './myHome/index'
import car from './myHome/car/index'
import collect from './myHome/collect/index'
import myInfo from './myHome/info'
import pay from './myHome/pay/index'
import nowpay from './myHome/pay/nowPay'
import address from './myHome/address/index'
import shouhou from './myHome/pay/shouhou'

import goodsInfo from './goods/info'
import goodsInfos from './goods/infos'
import goods from './goods/index'
import home  from './home/index'

import login  from './login/login'
import signUp  from './login/signUp'

import share  from './share/index'
import shareInfo  from './share/info'
import publishShare  from './share/publish'
import myShare  from './share/myShare'
import comment  from './comment/comment'
import myComment  from './comment/myComment'
import changShi  from './changShi/index'
import question  from './question/index'

let routes=[
    {
        path:'/index',
        name:'index',
        component:index,
        children:[
            {
                path:'/foot',
                name:'foot',
                component:foot,
                children:[
                    {
                        path:'/home',
                        name:'home',
                        component:home,
                    },
                    {
                        path:'/my',
                        name:'my',
                        component:my,
                    },
                    {
                        path:'/changShi',
                        name:'changShi',
                        component:changShi,
                    },
                    {
                        path:'/car',
                        name:'car',
                        component:car,
                    },

                    {
                        path:'/share',
                        name:'share',
                        component:share,
                    },
                ]},
            {
                path:'/myComment',
                name:'myComment',
                component:myComment,
            },
            {
                path:'/question',
                name:'question',
                component:question,
            },
            {
                path:'/goods',
                name:'goods',
                component:goods,
            },
            {
                path:'/comment',
                name:'comment',
                component:comment,
            },
            {
                path:'/publishShare',
                name:'publishShare',
                component:publishShare,
            },
            {
                path:'/myShare',
                name:'myShare',
                component:myShare,
            },
            {
                path:'/shareInfo',
                name:'shareInfo',
                component:shareInfo,
            },
            {
                path:'/goodsInfo',
                name:'goodsInfo',
                component:goodsInfo,
            },
            {
                path:'/shouhou',
                name:'shouhou',
                component:shouhou,
            },
            {
                path:'/goodsInfos',
                name:'goodsInfos',
                component:goodsInfos,
            },
            {
                path:'/collect',
                name:'collect',
                component:collect
            },
            {
                path:'/myInfo',
                name:'myInfo',
                component:myInfo
            },
            {
                path:'/address',
                name:'address',
                component:address
            },
            {
                path:'/pay',
                name:'pay',
                component:pay
            },
            {
                path:'/nowpay',
                name:'nowpay',
                component:nowpay,
            },
            {
                path:'/login',
                name:'login',
                component:login,
            },
            {
                path:'/signUp',
                name:'signUp',
                component:signUp,
            },
        ]
    },

]

let ROUTES=routes

export default ROUTES
