const Canvas = require("../models/canvasModel");

const getAllCanvases = async (req, res) => {
  const email = req.email;
  try {
    const canvases = await Canvas.getAllCanvases(email);
    res.status(200).json(canvases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCanvas = async (req, res) => {
  const email = req.email;
  const { name } = req.body;
  try {
    const canvas = await Canvas.createCanvas(email, name);
    res.status(201).json(canvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loadCanvas = async (req, res) => {
  const email = req.email;
  const id = req.params.id;
  try {
    const canvas = await Canvas.loadCanvas(email, id);
    if (!canvas) {
      return res.status(404).json({ error: "Canvas not found" });
    }
    res.status(200).json(canvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCanvas = async (req, res) => {
  const email = req.email;
  const id = req.params.id;
  const { elements } = req.body;
  try {
    const canvas = await Canvas.updateCanvas(email, id, elements);
    if (!canvas) {
      return res.status(404).json({ error: "Canvas not found" });
    }
    res.status(200).json(canvas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCanvas = async (req, res) => {
  const email = req.email;
  const id = req.params.id;
  try {
    const success = await Canvas.deleteCanvas(email, id);
    if (!success) {
      return res.status(404).json({ error: "Canvas not found" });
    }
    res.status(200).json({ message: "Canvas deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCanvases,
  createCanvas,
  loadCanvas,
  updateCanvas,
  deleteCanvas
};
