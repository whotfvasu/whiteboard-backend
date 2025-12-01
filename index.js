const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const canvasRoutes = require("./routes/canvasRoutes");

dotenv.config();

app.use(cors());
const connectDB = require("./db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/canvas", canvasRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
