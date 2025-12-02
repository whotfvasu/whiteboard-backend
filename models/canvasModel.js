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

canvasSchema.statics.getAllCanvases = async function (email) {
  try {
    const user = await mongoose.model("User").findOne({ email });
    if (!user) {
      return Error("User not found");
    }
    const canvases = await this.find({
      $or: [{ owner: user._id }, { sharedWith: user._id }],
    }).exec();

    const canvasSummaries = canvases.map((canvas) => ({
      _id: canvas._id,
      name: canvas.name,
      createdAt: canvas.createdAt,
      updatedAt: canvas.updatedAt,
      elements: canvas.elements,
    }));
    return canvasSummaries;
  } catch (error) {
    throw error;
  }
};

canvasSchema.statics.createCanvas = async function (email, name) {
  const user = await mongoose.model("User").findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    const ownerId = user._id;
    const canvas = await this.create({
      owner: ownerId,
      name,
      elements: [],
      sharedWith: [],
    });
    return canvas;
  } catch (error) {
    throw error;
  }
};

canvasSchema.statics.loadCanvas = async function (email, id) {
  const user = await mongoose.model("User").findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    const canvas = await this.findOne({
      _id: id,
      $or: [{ owner: user._id }, { sharedWith: user._id }],
    });
    return canvas;
  } catch (error) {
    throw error;
  }
};

canvasSchema.statics.updateCanvas = async function (email, id, elements) {
  const user = await mongoose.model("User").findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    console.log("Updating canvas with ID:", id);
    const canvas = await this.findById(id);
    if (!canvas) {
      return res.status(404).json({ error: "Canvas not found" });
    }

    canvas.elements = elements;
    await canvas.save();
    return canvas;
  } catch (error) {
    throw error;
  }
};

canvasSchema.statics.deleteCanvas = async function (email, id) {
  const user = await mongoose.model("User").findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    const canvas = await this.findOneAndDelete({
      _id: id,
      owner: user._id,
    });
    if (!canvas) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

canvasSchema.statics.shareCanvas = async function (
  email,
  canvasId,
  shareEmail
) {
  const user = await mongoose.model("User").findOne({ email });
  const shareUser = await mongoose.model("User").findOne({ email: shareEmail });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    if (!shareUser) {
      throw new Error("Share user not found");
    }
    const canvas = await this.findOne({
      _id: canvasId,
      owner: user._id,
    });
    if (!canvas) {
      throw new Error(
        "Canvas not found or you do not have permission to share it"
      );
    }
    if (canvas.sharedWith.includes(shareUser._id)) {
      throw new Error("User already has access to this canvas");
    }
    canvas.sharedWith.push(shareUser._id);
    await canvas.save();
    return canvas;
  } catch (error) {
    throw error;
  }
};

const CanvasModel = mongoose.model("Canvas", canvasSchema);

module.exports = CanvasModel;
