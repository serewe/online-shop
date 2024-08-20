const ApiError = require("../error/ApiError");
const { Rating, Device, User } = require("../models/models");

class RatingController {
  async getAllRatings(req, res, next) {
    try {
      const ratings = await Rating.findAll({
        include: [{ model: User, attributes: ["id", "email"] }],
      });
      return res.status(200).json(ratings);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async createRating(req, res, next) {
    try {
      const { rate, userId, deviceId } = req.body;

      const user = await User.findByPk(userId);
      const device = await Device.findByPk(deviceId);

      if (user === device) {
        return next(ApiError.badRequest("Этот пользователь уже оставил отзыв"));
      }

      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }

      if (!device) {
        return next(ApiError.badRequest("Устройство не найдено"));
      }

      const rating = await Rating.create({ rate, userId, deviceId });

      return res.status(201).json(rating);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async updateRating(req, res, next) {
    try {
      const { id } = req.params;
      const { rate } = req.body;

      const rating = await Rating.findByPk(id);

      if (!rating) {
        return next(ApiError.notFound("Рейтинг не найден"));
      }

      rating.rate = rate;
      await rating.save();

      return res.status(200).json(rating);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async getRatingsForDevice(req, res, next) {
    try {
      const { deviceId } = req.params;

      const ratings = await Rating.findAll({
        where: { deviceId },
        include: [{ model: User, attributes: ["id", "email"] }],
      });

      return res.status(200).json(ratings);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async getRatingById(req, res, next) {
    try {
      const { id } = req.params;

      const rating = await Rating.findByPk(id, {
        include: [
          { model: User, attributes: ["id", "email"] },
          { model: Device, attributes: ["id", "name"] },
        ],
      });

      if (!rating) {
        return next(ApiError.notFound("Рейтинг не найден"));
      }

      return res.status(200).json(rating);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async deleteRating(req, res, next) {
    try {
      const { id } = req.params;

      const rating = await Rating.findByPk(id);

      if (!rating) {
        return next(ApiError.notFound("Рейтинг не найден"));
      }

      await rating.destroy();

      return res.status(200).json({ message: "Рейтинг удален" });
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
}

module.exports = new RatingController();
