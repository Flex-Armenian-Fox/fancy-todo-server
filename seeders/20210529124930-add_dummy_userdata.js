'use strict';
const { User } =  require('../models')
const { encryptPassowrd } = require('../helpers/bcrypt.js')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const dummyData = User.generateDummyData(10)

    dummyData.map(el => {
      el.password = encryptPassowrd(el.password)
      return el
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', dummyData, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
