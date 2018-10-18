const fs = require('fs');
const path = require('path')

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'myProject',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+08:00' //东八时区
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'myProject',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+08:00' //东八时区
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    timezone: '+08:00', //东八时区
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    }
  },
  imgUploads: path.join(__dirname, '..', 'public', 'uploadImgs'),
  session: {
    secret: 'mynode',
    key: 'mynode',
    maxAge: 2480000
  }
};