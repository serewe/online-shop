import { $authHost } from "./index";

export const getRatingsForDevice = async (deviceId) => {
  try {
    const { data } = await $authHost.get(`/api/rating/device/${deviceId}`);
    return data;
  } catch (error) {
    console.error("Failed to get ratings for device:", error);
    throw error;
  }
};

export const deleteRatingToDevice = async (ratingId) => {
  try {
    const { data } = await $authHost.delete(`api/rating/${ratingId}`);
    return data;
  } catch (error) {
    console.error("Failed to remove rating from device:", error);
  }
};

export const addRatingToDevice = async (userId, deviceId, rate) => {
  try {
    const { data } = await $authHost.post("/api/rating", {
      userId,
      deviceId,
      rate,
    });
    return data;
  } catch (error) {
    console.error("Failed to add rating to device:", error);
    throw error;
  }
};

export const updateRatingToDevice = async (ratingId, rate) => {
  try {
    const { data } = await $authHost.put(`/api/rating/${ratingId}`, {
      rate,
    });
    return data;
  } catch (error) {
    console.error("Failed to update rating to device:", error);
    throw error;
  }
};
