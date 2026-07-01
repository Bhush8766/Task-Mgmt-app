// const express = require("express");

// const {
//   register,
//   login,
//   getUserInfo,
//   getAllUsers,
//   getProfile,
//   updateProfile,
//   changePassword,
// } = require("../controllers/userController");

// const { auth } = require("../middleware/auth");
// const uploadImage = require("../middleware/multer");

// const router = express.Router();

// router.post(
//   "/register",
//   uploadImage.single("imgPath"),
//   register
// );

// router.post("/login", login);

// router.get("/getUserInfo", auth, getUserInfo);

// router.get("/profile", auth, getProfile);

// router.put(
//   "/update-profile",
//   auth,
//   uploadImage.single("imgPath"),
//   updateProfile
// );

// router.put(
//   "/change-password",
//   auth,
//   changePassword
// );

// router.get("/getAllUsers", getAllUsers);

// module.exports = router;



const express = require("express");

const {
  register,
  login,
  getUserInfo,
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const { auth } = require("../middleware/auth");
const uploadImage = require("../middleware/multer");

const router = express.Router();

router.post("/register", uploadImage.single("imgPath"), register);

router.post("/login", login);

router.get("/getUserInfo", auth, getUserInfo);

router.get("/profile", auth, getProfile);

router.get("/getAllUsers", auth, getAllUsers);

// NEW
router.put(
  "/updateProfile",
  auth,
  uploadImage.single("imgPath"),
  updateProfile
);

router.put(
  "/changePassword",
  auth,
  changePassword
);

module.exports = router;