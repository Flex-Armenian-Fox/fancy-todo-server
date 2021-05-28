'use strict';
const { Model } = require('sequelize');
let date = new Date();
date.setDate(date.getDate() - 1);
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: date.toISOString().split('T')[0],
            msg: 'Due date cannot be the day before today',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
