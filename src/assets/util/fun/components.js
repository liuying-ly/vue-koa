
import upImg from '../components/upImg'   //上传图片
import userImage from '../components/userImage.vue'   //上传图片
const publicTitle= {
    install: function (Vue) {
        Vue.component('upImg',upImg),
            Vue.component('userImage',userImage)
    }
}
export default publicTitle;