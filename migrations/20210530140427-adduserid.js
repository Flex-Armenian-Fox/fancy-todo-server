'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todos", "UserId", {
      type: Sequelize.INTEGER,
    })

    await queryInterface.addConstraint("todos", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })

    await queryInterface.addConstraint("users", {
      fields: ["email"],
      type: "unique",
      name: "user_unique_email",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "user_unique_email");
    await queryInterface.removeConstraint("todos", "user_fk");
    await queryInterface.removeColumn("todos", "UserId") 
  }
};
