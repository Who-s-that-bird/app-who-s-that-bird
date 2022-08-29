const router = require("express").Router();
const miscController = require("../controllers/misc.controller");

// MISC
router.get("/", miscController.home);

// BIRDS

module.exports = router;
