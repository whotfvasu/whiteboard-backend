const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    elements: { type: [{ type: mongoose.Schema.Types.Mixed }], default: [] },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  },
  {
    timestamps: true,
    collection: "canvasCollection",
  }
);

const CanvasModel = mongoose.model("Canvas", canvasSchema);

module.exports = CanvasModel;
