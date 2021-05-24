'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'attribute title cannot be NULL'
        },
        notEmpty: {
          args: true,
          msg: 'attribute title cannot be empty!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'attribute description cannot be NULL'
        },
        notEmpty: {
          args: true,
          msg: 'attribute description cannot be empty!'
        }
      }
    },
    status: {
      type: DataTypes.ENUM("New", "Process", "Complete"),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'attribute status cannot be NULL'
        },
        notEmpty: {
          args: true,
          msg: 'attribute status cannot be Empty'
        },
        isIn: {
          args: [["New", "Process", "Complete"]],
          msg: 'attribute status must between New, Process, or Complete'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'attribute due_date cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'attribute due_date cannot be empty'
        },
        validateToday(value) {
          console.log('masuk pak haji', value)
          console.log('tipenya', typeof value)
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};