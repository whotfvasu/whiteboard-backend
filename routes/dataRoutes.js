const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send({ message: "data route is working" });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  res.status(200).send(`User ${name} with email ${email} created successfully`);
});

module.exports = router;
