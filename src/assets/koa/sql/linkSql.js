
const mysql = require('mysql');
let pool=mysql.createPool({
    host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
    user: 'root',
    password: 'root', // root 密码
    database: 'test', // 数据库名
    port: '3306',
    multipleStatements: true    // 多语句查询
});

let linkSql=function(sql,callback) {
  console.log(sql)
    pool.getConnection((err, connection) => {
        connection.query(sql, [], (err, result) => {
            if(err){
                callback(false)
                throw err;
            }else{
                callback(result);
                connection.release();
            }
        })
    })
}
module.exports =linkSql
