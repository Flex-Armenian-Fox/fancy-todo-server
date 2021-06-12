'use strict';
const { Model } = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Email cannot be empty/null',
          },
          notEmpty: {
            msg: 'Email cannot be empty/null',
          },
          isEmail: {
            msg: 'Email format is wrong',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password cannot be empty/null',
          },
          notEmpty: {
            msg: 'Password cannot be empty/null',
          },
          len: {
            args: [6, 20],
            msg: 'Password minimum character is 6',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((user) => {
    user.email = user.email.toLowerCase();
    user.password = hash(user.password);
  });
  return User;
};
