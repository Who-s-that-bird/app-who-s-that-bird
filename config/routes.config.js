const router = require("express").Router();
const passport = require('passport');
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/userMiddleware");
const usersController = require("../controllers/user.controller");
const birdsController = require("../controllers/birds.controller");

// MISC
router.get("/", miscController.home);


// AUTH
router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login);
router.post("/login", authController.doLogin);
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }));
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle);
router.get("/logout", authController.logout);

// USERS

router.get("/profile", authMiddlewares.isAuthenticated, usersController.profile);



//BIRDS
router.get("/birds/list", birdsController.list)
router.get("/bird/:id", birdsController.details)


module.exports = router;
