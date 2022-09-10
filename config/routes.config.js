const router = require("express").Router();
const passport = require("passport");
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/userMiddleware");
const usersController = require("../controllers/user.controller");
const birdsController = require("../controllers/birds.controller");
const albumsController = require("../controllers/album.controller");
const commentsController = require("../controllers/comment.controller");
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
router.get( "/birds/birdCreate", authMiddlewares.isAuthenticated, birdsController.create);
router.post( "/birds/birdCreate", authMiddlewares.isAuthenticated, fileUploader.single("image"), birdsController.doCreate);

//ALBUM
router.get("/albums/albumCreate", albumsController.create);
router.post("/albums", fileUploader.single("image"), albumsController.doCreate);

//COMENTS
// router.get("/comments/commentCreate", authMiddlewares.isAuthenticated, commentsController.create);
router.post("/comments/:birdId", authMiddlewares.isAuthenticated, commentsController.doCreate)


module.exports = router;
