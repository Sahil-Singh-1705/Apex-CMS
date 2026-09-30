const { leaderboard } = require("../db/db"); 

exports.createLeaderBoard = async (req, res) => {
  try {
    const { name, capital, profit, day, maxLoss, maxProfit, percentage } = req.body;

    const newEntry = await leaderboard.create({
      name,
      capital,
      profit,
      day,
      maxLoss,
      maxProfit,
      percentage,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating LeaderBoard entry:", error);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

// GET ALL
exports.getLeaderBoards = async (req, res) => {
  try {
    const entries = await leaderboard.findAll();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching LeaderBoard entries:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};

// UPDATE
exports.updateLeaderBoard = async (req, res) => {
  try {
    const { name, capital, profit, day, maxLoss, maxProfit, percentage } = req.body;

    const entry = await leaderboard.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    await entry.update({
      name,
      capital,
      profit,
      day,
      maxLoss,
      maxProfit,
      percentage,
    });

    res.json(entry);
  } catch (error) {
    console.error("Error updating LeaderBoard entry:", error);
    res.status(500).json({ error: "Failed to update entry" });
  }
};

// GET BY ID
exports.getLeaderBoardById = async (req, res) => {
  try {
    const entry = await leaderboard.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error("Error fetching LeaderBoard entry:", error);
    res.status(500).json({ error: "Failed to fetch entry" });
  }
};


// DELETE
exports.deleteLeaderBoard = async (req, res) => {
  try {
    const entry = await leaderboard.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    await entry.destroy();
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting LeaderBoard entry:", error);
    res.status(500).json({ error: "Failed to delete entry" });
  }
};