const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
const dataRoutes = require("./routes/dataRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
