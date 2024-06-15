const { Basket, BasketDevice, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  // Создать корзину для пользователя
  async create(req, res, next) {
    try {
      const { userId } = req.body;
      const basket = await Basket.create({ userId });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // Добавить устройство в корзину
  async addDevice(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.create({ basketId, deviceId });
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // Получить корзину пользователя
  async getBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findOne({
        where: { userId },
        include: [
          {
            model: BasketDevice,
            as: "basket_devices", // исправленный алиас
            include: [{ model: Device, as: "device" }],
          },
        ],
      });
      if (!basket) {
        return next(ApiError.badRequest("Basket not found"));
      }
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
