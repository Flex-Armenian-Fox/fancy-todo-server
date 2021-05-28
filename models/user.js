'use strict';
const {hash} = require('../helpers/brcypt')
const {
  Model, UniqueConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey:"user_id"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'email is already taken'
      },
      validate: {
        notEmpty: {msg: "email cannot be empty"},
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "password cannot be empty"},
      }
    },
  }, {
    hooks:{
      beforeCreate: user =>{
        user.password = hash(user.password)
        user.email = user.email.toLowerCase()
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};