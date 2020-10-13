/* import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
function json(data){
    return JSON.parse(data)
}

let store= new Vuex.Store({
    state: {
        admin:json(sessionStorage.getItem('adminInfo'))||json(localStorage.getItem('adminInfo'))||{
            adminaccount:'',
            adminpassword:''
        }
    },
    getters: {
        admin(state){
            return state.admin
        },
    },
    mutations: {
        
    }
})

export default adminInfo */