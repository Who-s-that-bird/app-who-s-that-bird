const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const birdsController = require ("../controllers/birds.controller")

// MISC
router.get("/", miscController.home);














//BIRDS
router.get("/birdslist", birdsController.list)
router.get("/bird/:id", birdsController.details)
router.get("/bird/:id/moreDetails", birdsController.detailTotal)



module.exports = router;
