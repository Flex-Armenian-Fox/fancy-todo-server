'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', 
    [
      {
        title: 'Kerjain Fancy Todo',
        description: 'todo tapi lebih fancy',
        status: 'ongoing',
        due_date: new Date('2022-07-10T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Beli kado ultah doi',
        description: 'budget 200ribu',
        status: 'ongoing',
        due_date: new Date('2021-08-01T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {})
  }
};
