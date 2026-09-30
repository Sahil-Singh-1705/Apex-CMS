const { Sequelize, DataTypes } = require("sequelize");
const {
  dbName,
  dbUsername,
  dbPassword,
  dbHost,
  dialect,
  dbPort,
} = require("./db.config");
const logger = require("../utils/logger");

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("DB Authentication Successful");
  })
  .catch((err) => {
    logger.error("DB Error", err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("../models/Admin")(sequelize, DataTypes);
db.pages = require("../models/Page")(sequelize, DataTypes);
db.rows = require("../models/Row")(sequelize, DataTypes);
db.columns = require("../models/Column")(sequelize, DataTypes);
db.menus = require("../models/Menu")(sequelize, DataTypes);
db.submenus = require("../models/Submenu")(sequelize, DataTypes);
db.menunames = require("../models/MenuName")(sequelize, DataTypes);
db.images = require("../models/Images")(sequelize, DataTypes);
db.blog = require("../models/Blog")(sequelize, DataTypes);
db.category = require("../models/Category")(sequelize, DataTypes);
db.row_blog = require("../models/Row_blog")(sequelize, DataTypes);
db.column_blog = require("../models/Column_blog")(sequelize, DataTypes);

db.Contact = require("../models/Contact")(sequelize, DataTypes);

db.queries_form = require("../models/Queries")(sequelize, DataTypes);
db.popup = require("../models/Popup")(sequelize, DataTypes);
db.slider = require("../models/Slider")(sequelize, DataTypes);
db.companydetails = require("../models/Companydetails")(sequelize, DataTypes);
db.FooterSettings = require("../models/footerSettings")(sequelize, DataTypes);
db.ticket = require("../models/Ticket")(sequelize, DataTypes);

sequelize.sync({ alter: false });

module.exports = db;