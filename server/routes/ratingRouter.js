const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/ratingController");

router.post("/", ratingController.createRating);
router.put("/:id", ratingController.updateRating);
router.get("/device/:deviceId", ratingController.getRatingsForDevice);
router.get("/:id", ratingController.getRatingById);
router.delete("/:id", ratingController.deleteRating);
router.get("/", ratingController.getAllRatings);
module.exports = router;
