const { Basket, BasketDevice, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async create(req, res, next) {
    try {
      const { userId } = req.body;
      const basket = await Basket.create({ userId });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addDevice(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.create({ basketId, deviceId });
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeAllDevices(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;

      const basketDevices = await BasketDevice.findAll({
        where: { basketId, deviceId },
      });

      if (basketDevices.length === 0) {
        return next(
          ApiError.badRequest("No devices found with the given deviceId")
        );
      }

      await BasketDevice.destroy({
        where: { basketId, deviceId },
      });

      return res.json({
        message: `Removed ${basketDevices.length} devices with deviceId ${deviceId}`,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeDevice(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;

      const basketDevice = await BasketDevice.findOne({
        where: { basketId, deviceId },
      });

      if (!basketDevice) {
        return next(ApiError.badRequest("Device not found in basket"));
      }

      await basketDevice.destroy();

      return res.json({ message: "Device removed from basket" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findOne({
        where: { userId },
        include: [
          {
            model: BasketDevice,
            as: "basket_devices",
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
