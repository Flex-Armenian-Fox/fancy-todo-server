'use strict';

const todos = require('./todo.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    todos.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })
    return queryInterface.bulkInsert('Todos', todos, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Todos', null, {})
  }
};
