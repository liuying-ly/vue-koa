const Monk = require('monk')
const url = 'localhost:27017/meng_chong';
const db = new Monk(url);

class LinkMdb{
    constructor(){

    }

    db(){
        return db
    }
    get(table,data,next){
        return new Promise(  (resolve, reject) => {
            console.log(1)
            db.get(table).find(data).then(res=>{
                resolve(res) ;
            })
        })
    }

      add(table,data){
          return new Promise(   (rs, rj) => {
              if (db.get(table).insert([data])) {
                  rs(true)
              } else {
                  rj(false)
              }
          })
    }

    del(table,data,call){
        return new Promise(   (rs, rj) => {
            if (db.get(table).remove(data)) {
                rs(true)
            } else {
                rj(false)
            }
        })
    }

    update(table,where,data){
        return new Promise(   (rs, rj) => {
            if (db.get(table).update(where,data)) {

                rs(true)
            } else {

                rj(false)
            }
            //db.close()
        })
    }
    link(table1,table2,news,where){
        let table1_name=table1[0]
        let table1_col=table1[1]
        let table2_name=table2[0]
        let table2_co1=table2[1]
        return new Promise(   (rs, rj) => {
            db.get(table1_name).aggregate({
                $lookup:
                    {
                        from: table2_name,            // 右集合
                        localField: table1_col,    // 左集合 join 字段
                        foreignField: table2_co1,         // 右集合 join 字段
                        as: news           // 新生成字段（类型array）
                    }
            },function(err, res) {
                if (err) rj(err);
                rs(res)
            })
        })
    }

}

module.exports=LinkMdb

