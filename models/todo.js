'use strict';
const {
  Model
} = require('sequelize');
const dateFormat = require("dateformat")
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.users, {foreignKey: "UserId"})
    }
  };
  todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Please Provide Date'
        }, 
        isValidDate(value){
          if(dateFormat(value, "yyyy-mm-dd") < dateFormat(new Date(), "yyyy-mm-dd")) {
            throw new Error("Date Is Not Valid!!")
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "USer Id Can't Be Null"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};