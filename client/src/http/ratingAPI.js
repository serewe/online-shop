import { $authHost } from "./index";

export const getRaitingDevice = async (deviceId) => {
  try {
    const { data } = await $authHost.get(
      `api/rating?deviceId=${deviceId.toString()}`
    );
    if (data === undefined) {
      console.error("undefin111111ed");
    } else return data;
  } catch (error) {
    console.error("Failed to get rating:", error);
    throw error;
  }
};

export const addRaitingDevice = async (userId, deviceId, rate) => {
  try {
    const { data } = await $authHost.post("api/rating/", {
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
