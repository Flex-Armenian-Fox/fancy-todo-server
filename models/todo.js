'use strict';
const { Model } = require('sequelize');
const getYesterday = require('../helpers/yesterday.js')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('ongoing', 'completed'),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty'
        },
        isIn: {
          args: [['ongoing', 'completed']],
          msg: 'Status must be "ongoing" or "completed"'
        }
      }},
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Due date cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Due date cannot be empty'
        },
        isAfter: {
          args: getYesterday(new Date()),
          msg: 'Due date must be today or after'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};