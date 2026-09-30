const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Footersettings = sequelize.define("footersettings", {

    company_name: DataTypes.STRING,
    register_no: DataTypes.STRING,

    email: DataTypes.STRING,
    support_email: DataTypes.STRING,
    phone: DataTypes.STRING,

    description: DataTypes.TEXT,

    registered_address: DataTypes.STRING,
    physical_address: DataTypes.STRING,

    risk_disclosure: DataTypes.TEXT,
    restricted_regions: DataTypes.TEXT,

    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    instagram: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    youtube: DataTypes.STRING

  });

  return Footersettings;
};
 