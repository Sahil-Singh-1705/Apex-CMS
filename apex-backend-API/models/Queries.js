const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const queries_form = sequelize.define("queries_form", {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country_code:{
        type:DataTypes.STRING(3),
        allowNull:false,
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING(255),
      allowNull: false,
        },
  });
  return queries_form;
};
