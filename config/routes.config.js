const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/userMiddleware");

// MISC
router.get("/", miscController.home);


// AUTH
router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login);
router.post("/login", authController.doLogin);
router.get("/logout", authController.logout);

// USERS













//BIRDS
router.get("/birdslist", birdsController.list)
router.get("/bird/:id", birdsController.details)



module.exports = router;
