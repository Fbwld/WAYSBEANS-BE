'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartoke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartoke.belongsTo(models.product, {
        as: "products",
        foreignKey: {
          name: "idProduct",
        },
      });
      cartoke.belongsTo(models.user, {
        as  : 'user',
        foreignKey : 'idUser'
      });
    }
  }
  cartoke.init({
    qty: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cartoke',
  });
  return cartoke;
};