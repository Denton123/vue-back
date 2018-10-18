'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
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
    date: {
        type: DataTypes.DATE,
        comment: '发表日期'
    },
  }, {});
  Article.associate = function(models) {
    Article.belongsTo(models.User, {foreignKey: 'user_id'}),
    models.User.hasMany(Article, {foreignKey: 'user_id'})
  };
  return Article;
};