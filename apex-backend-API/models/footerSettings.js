module.exports = (sequelize, DataTypes) => {

  const FooterSettings = sequelize.define(
    "FooterSettings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      company_name: DataTypes.STRING,
      register_no: DataTypes.STRING,

      email: DataTypes.STRING,
      support_email: DataTypes.STRING,
      phone: DataTypes.STRING,

      description: DataTypes.TEXT,

      registered_address: DataTypes.TEXT,
      physical_address: DataTypes.TEXT,

      risk_disclosure: DataTypes.TEXT,
      restricted_regions: DataTypes.TEXT,

      facebook: DataTypes.STRING,
      twitter: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      instagram: DataTypes.STRING,
      youtube: DataTypes.STRING

    },
    {
      tableName: "footer_settings",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  return FooterSettings;
};