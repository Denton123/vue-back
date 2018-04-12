'use strict';
var data = []
for (let i = 0; i< 5; i++) {
  data.push({
    user_id: '1',
    title: '今天到底是好天气啊',
    content: '但都比不上你的好',
    solve: '1',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Questions', data, {});
},

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
