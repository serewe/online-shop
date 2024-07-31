const Router = require("express");
const RatingController = require("../controllers/ratingController");
const router = new Router();

router.post("/", RatingController.create);
router.get("/", RatingController.getRating);

module.exports = router;
