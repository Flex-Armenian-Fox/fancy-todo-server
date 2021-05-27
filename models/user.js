'use strict';
const { Model } = require('sequelize');
const { encryptPassowrd } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'user_id' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must atleast 6 characters long'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const encPassword = encryptPassowrd(user.password)
        user.password = encPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};