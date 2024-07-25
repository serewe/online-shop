const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.create);
router.post("/device", basketController.addDevice);
router.get("/:userId", basketController.getBasket);
router.delete("/device", basketController.removeDevice);
router.delete("/device/all", basketController.removeAllDevices);
router.get("/promo");
module.exports = router;
