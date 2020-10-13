
import index from './index'
import login from './login'
//import adminlogin from './adminlogin'
import admin from './admin/index'
import user from './user/index'
import goods from './goods/index'
import pay from './pay/index'
import sorts from './sorts/index'
import home from './home'

let routes=[
    {
        path:'/admin_index',
        name:'index',
        component:index,
        children:[
            {
                path:'/admin_user',
                name:'user',
                component:user,
            },
			{
			    path:'/admin_admin',
			    name:'admin',
			    component:admin,
			},
            {
                path:'/admin_goods',
                name:'goods',
                component:goods,
            },
            {
                path:'/admin_pay',
                name:'pay',
                component:pay,
            },
            {
                path:'/admin_sorts',
                name:'sorts',
                component:sorts,
            },
            {
                path:'/admin_home',
                name:'home',
                component:home,
            },
        ]
    },
    {
        path:'/admin_login',
        //name:'adminlogin',
        //component:adminlogin,
        name:'login',
        component:login,
    },
]

let ROUTES=routes

export default ROUTES
