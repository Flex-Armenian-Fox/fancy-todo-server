'use strict';
const { Model } = require('sequelize');
const { encryptPassowrd } = require('../helpers/bcrypt.js')
const faker = require('faker')
const fs = require('fs')

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

    static generateDummyData(totalData = 1) {
      let results = []

      for (let i = 0; i < totalData; i++) {
        results.push({
          email: faker.internet.email(),
          password: faker.internet.password(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        
      }
      
      fs.writeFileSync('./seeders/users.json', JSON.stringify(results, null, 2))

      return results
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