'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Holiday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Holiday.hasOne(models.Todo, { foreignKey: 'holiday_id' })
    }
  };
  Holiday.init({
    holiday_name: DataTypes.STRING,
    holiday_date: DataTypes.DATE,
    holiday_description: DataTypes.STRING,
    holiday_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Holiday',
  });
  return Holiday;
};