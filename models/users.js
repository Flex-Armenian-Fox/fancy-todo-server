'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bycrpt");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.todo, {foreignKey: "UserId"})
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has been used"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email Format"
        },
        notNull: {
          args: true, 
          msg: "Email Can't be null"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password Minimum Has 8 Characters"
        }
      },
      notNull: {
        args: true,
        msg: "Password Can`t be Null"
      }
    }
  }, {
    sequelize,
    modelName: 'users',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;
      }
    }
  });
  return users;
};