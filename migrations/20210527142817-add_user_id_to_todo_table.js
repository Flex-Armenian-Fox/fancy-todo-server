'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.addColumn('Todos', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'user_id', {})
  }
};
