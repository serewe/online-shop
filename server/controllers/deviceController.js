const { Device, DeviceInfo, Rating } = require("../models/models");
const ApiError = require("../error/ApiError");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      if (!img) {
        return next(ApiError.badRequest("Изображение не загружено"));
      }

      let fileName = uuidv4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        await Promise.all(
          info.map((i) =>
            DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: device.id,
            })
          )
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = (page - 1) * limit;

      const filter = {};
      if (brandId) filter.brandId = brandId;
      if (typeId) filter.typeId = typeId;

      const devices = await Device.findAll({
        where: filter,
        limit,
        offset,
      });

      const getRatingForDevice = async (device) => {
        const ratings = await Rating.findAll({
          where: { deviceId: device.id },
        });
        const rating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length
            : 0;
        return {
          ...device.toJSON(),
          rating: rating.toFixed(1) === "0.0" ? undefined : rating.toFixed(1),
        };
      };

      const devicesWithRatings = await Promise.all(
        devices.map(getRatingForDevice)
      );

      return res.json({
        count: devices.length,
        rows: devicesWithRatings,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const { userId } = req.query;

    try {
      // Получение устройства с его информацией
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      if (!device) {
        return res.status(404).json({ message: "Устройство не найдено" });
      }

      // Получение всех рейтингов устройства
      const ratings = await Rating.findAll({ where: { deviceId: id } });

      // Вычисление среднего рейтинга
      const rating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating.rate, 0) /
            ratings.length
          : 0;

      // Получение полной модели рейтинга конкретного пользователя (если указан userId)
      const userRating = userId
        ? await Rating.findOne({ where: { deviceId: id, userId } })
        : null;

      // Если userRating существует, вернуть его объект, иначе вернуть null
      const hasUserRated = userRating ? userRating.toJSON() : null;

      // Округление рейтинга
      let roundedRating = rating.toFixed(1);
      if (roundedRating === "0.0") {
        roundedRating = undefined;
      }

      return res.json({
        ...device.toJSON(),
        rating: roundedRating,
        hasUserRated,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DeviceController();
