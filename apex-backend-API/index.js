const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/db");
const logger = require("./utils/logger");


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

db.sequelize
  .sync()
  .then(() => {
    logger.info("Database in Sync"); // replace console.log
  })
  .catch((err) => {
    logger.error("Database Sync Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/static', express.static('public'))
app.use("/api/admin", require("./routes/admin"));
app.use("/api", require("./routes/blog"));
app.use("/api/category", require("./routes/category"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/queries", require("./routes/queries"));
app.use("/api/popup", require("./routes/popup"));
app.use("/api/slider", require("./routes/slider"));
app.use("/api/ticket", require("./routes/ticket"));
app.use("/api/leaderboard", require("./routes/leader-board"));
app.use("/api/footer", require("./routes/footer"));
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`); // replace console.log
});

// database
// Admin - id, name, email, password, forgetpassword, changepassword, created_at, updated_at
// Pages - id, name, uniqueId, endpoint, htmlCode, created_at, updated_at
// Rows - id, uniqueId, pageId, columnType, rowIndex, created_at, updated_at
// Columns - id, uniqueId, pageId, rowId, content, width, index, created_at, updated_at
// Images - id, uniqueId, image, fileType, created_at, updated_at
