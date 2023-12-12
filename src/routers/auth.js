const router = require("express").Router();

const authController = require("../controllers/auth");

const upload = require("../middleware/upload");

// Middleware Function
const checkJwt = authController._checkJwt;

// ENDPOINT AUTH
// Get all users
router.get("/users", authController._getAllUser);

// Register
router.post(
  "/users/register",
  authController._inputValidationRegist,
  authController._regist
);

// Login
router.post(
  "/users/login",
  authController._inputValidationLogin,
  authController._login
);

// Get detail user
router.get("/users/me", checkJwt, authController._getDetailUser);

// Edit Profile (/users/edit)
router.put(
  "/users/edit",
  checkJwt,
  authController._validationEditProfile,
  authController._editProfile
);

router.post("/users/edit/photo", upload, authController._editPhotoProfile);

module.exports = router;
