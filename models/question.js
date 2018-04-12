'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    user_id: {
        type: DataTypes.INTEGER,
        comment: '用户ID'
    },
    title: {
        type: DataTypes.STRING(50),
        validate: {
            len: {
              args: [5, 20],
              msg: '标题在5至20个字符之间'
            },
            comment: '标题'
        }
    },
    content: {
        type: DataTypes.TEXT,
        comment: '问题内容'
    },
    solve: {
        type: DataTypes.ENUM('0', '1'),
        defaultValue: '0',
        comment: '是否解决  0为未解决，1为解决'
    },
    date: {
            type: DataTypes.DATE,
            comment: '发表日期'
    },
    createdAt: { 
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {foreignKey: 'user_id'}),
    models.User.hasMany(Question, {foreignKey: 'user_id'})
  };
  return Question;
};