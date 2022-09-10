const router = require("express").Router();
const passport = require("passport");
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/userMiddleware");
const usersController = require("../controllers/user.controller");
const birdsController = require("../controllers/birds.controller");
const albumController = require("../controllers/album.controller");
const fileUploader = require("../config/cloudinary.config");

const SCOPES = ["profile", "email"];

// MISC
router.get("/", miscController.home);

// AUTH
router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login);
router.post("/login", authController.doLogin);
router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);
//passport auth local token
router.get(
  "/activate/:token",
  authMiddlewares.isNotAuthenticated,
  authController.activateAccount
);
//passport auth google credentials
router.get(
  "/login/google",
  authMiddlewares.isNotAuthenticated,
  passport.authenticate("google-auth", { scope: SCOPES })
);
router.get(
  "/auth/google/callback",
  authMiddlewares.isNotAuthenticated,
  authController.doLoginGoogle
);

// USERS
router.get("/profile", authMiddlewares.isAuthenticated, usersController.profile);
router.get("/albums/albumDetail", authMiddlewares.isAuthenticated, usersController.album);


//BIRDS
router.get("/birdslist", birdsController.list);
router.get("/bird/:id", birdsController.birdDetail);
router.get(
  "/bird/:id/total",
  authMiddlewares.isAuthenticated,
  birdsController.birdDetailTotal
);
router.get(
  "/birds/birdCreate",
  authMiddlewares.isAuthenticated,
  birdsController.create
);
router.post(
  "/birds/birdCreate",
  authMiddlewares.isAuthenticated,
  fileUploader.single("image"),
  birdsController.doCreate
);

//ALBUM
router.get("/albums/albumCreate", albumController.create);
router.post("/albums", fileUploader.single("image"), albumController.doCreate);

module.exports = router;
