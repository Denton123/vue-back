'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING(50),
        validate: {
            len: {
                args: [4, 16],
                msg: '用户名长度为4到16位'
            }
        },
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING(50),
        validate: {
            len: {
                args: /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/,
                msg: '密码长度不少于9位，必须包含字母和数字'
            }
        },
        comment: '密码'
    },
    sex: {
        type: DataTypes.ENUM,
        values: ['male', 'female']
    },
    avatar: {
        type: DataTypes.STRING(255), 
      },
    desc: {
        type: DataTypes.STRING(255), 
      },
    bg: {
        type: DataTypes.STRING(255), 
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};