const express = require("express");
const path = require("path");
require("dotenv").config();

const { getFullUserData } = require("./core");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/user", async (req, res) => {
  try {
    const data = await getFullUserData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
