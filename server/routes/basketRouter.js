const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.create); // Создать корзину
router.post("/device", basketController.addDevice); // Добавить устройство в корзину
router.get("/:userId", basketController.getBasket); // Получить корзину пользователя

module.exports = router;
