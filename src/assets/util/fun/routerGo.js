export default function routerGo(path,query='',call=false) {
    if(this.$route.fullPath!==path){
        this.$router.push({
            path:path,
            query:query
        })
    }
    setTimeout(()=>{
        call?call():false
    })

}