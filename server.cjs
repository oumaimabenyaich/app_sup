const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const CONFIG_PATH = path.join(__dirname, "storage", "config.json");
const DATA_PATH = path.join(__dirname, "storage", "data.json");

// Route pour sauvegarder
app.post("/save", (req, res) => {
  try {
    const { config, data } = req.body;

    if (!config || !data) {
      return res.status(400).json({ ok: false, error: "config ou data manquant" });
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

app.listen(3001, () => {
  console.log("✅ Serveur local OK : http://localhost:3001");
});
