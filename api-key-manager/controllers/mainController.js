const service = require("../services/mainService");

exports.create = (req, res) => {
  try {
    const { title, secret } = req.body;
    if (!title || !secret) {
      return res.status(400).json({ error: "title and secret are required" });
    }
    const item = service.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("create error:", err.message);
    res.status(500).json({ error: "Failed to create key" });
  }
};

exports.list = (req, res) => {
  try {
    const data = service.list();
    res.json(data);
  } catch (err) {
    console.error("list error:", err.message);
    res.status(500).json({ error: "Failed to list keys" });
  }
};

exports.remove = (req, res) => {
  try {
    const removed = service.remove(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: "Key not found" });
    }
    res.json({ message: "deleted" });
  } catch (err) {
    console.error("remove error:", err.message);
    res.status(500).json({ error: "Failed to delete key" });
  }
};