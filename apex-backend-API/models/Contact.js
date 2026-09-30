module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },

      subject: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("new", "read"),
        defaultValue: "new",
      },
    },
    {
      tableName: "contact_messages",

      timestamps: true,

      createdAt: "created_at", 
      updatedAt: false,       
    }
  );

  return Contact;
};