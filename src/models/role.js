'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // in case of many to many relationship we need to set up relationship through a third table and is automaticaly generated for us by sequelize 
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'User_Roles'
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};