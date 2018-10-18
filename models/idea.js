'use strict';
module.exports = (sequelize, DataTypes) => {
  var Idea = sequelize.define('Idea', {
    user_id: DataTypes.STRING,
    title: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {});
  Idea.associate = function(models) {
    Idea.belongsTo(models.User, {foreignKey: 'user_id'}),
    models.User.hasMany(Idea, {foreignKey: 'user_id'})
  };
  return Idea;
};