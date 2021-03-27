const mysql =require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

mysqlConnection.connect(function (error){
    if(error){
        console.log(error);
        return;
    } else {
        console.log('Db conectada')
    }
});

module.exports = mysqlConnection;
