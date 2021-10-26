var mysql = require('mysql')

var pool = mysql.createPool({
   
    host: "localhost",
    user: "root",
    password: "root",
    database: "pixable",
    port:3306
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            console.log("Database connection was closed")
        }
        if (err.code == "ER_CON_COUNT_ERROR") {
            console.log("Database has to many connections")
        }
        if (err.code == "ERCONNREFUSED") {
            console.log("Database connection was refused")
        }
    }
    if (connection) {
        connection.release()
    }
    return
})
pool.query('SELECT title FROM movies', (err, res)=> {
    var arr = []
    
    pool.query('SELECT title FROM movieinfo', (error, resp)=> {
        var resMap = res.map(itm => itm['title'])
        var mapped = resp.map(item => item['title'])
        for(var i = 0; i < resMap.length; i++) {
            if(!mapped.includes(resMap[i])) {
                arr.push(resMap[i]) 
            }
        }
        console.log("ARR: ", arr, arr.length);
    })
})
module.exports = pool;