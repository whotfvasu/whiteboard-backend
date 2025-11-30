const {
  register,
  getUsers,
  findUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.get("/", getUsers);
router.post("/find", findUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

module.exports = router;
