'use strict';
const crypto = require('crypto')

function getHash(password) {
  let hash = crypto.createHash('md5')
    .update(password)
    .digest('hex')
  return hash
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'sdt',
      password: getHash('000000'),
      sex: 'female',
      avatar: null,
      introduction: '我是烟火',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
  }
};
