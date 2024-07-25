import { $authHost } from "./index";

export const getBasketByUserId = async (userId) => {
  try {
    const { data } = await $authHost.get(`api/basket/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to get basket:", error);
    throw error;
  }
};

export const addDeviceToBasket = async (basketId, deviceId) => {
  try {
    const { data } = await $authHost.post("api/basket/device", {
      basketId,
      deviceId,
    });
    return data;
  } catch (error) {
    console.error("Failed to add device to basket:", error);
    throw error;
  }
};

export const removeDeviceFromBasket = async (basketId, deviceId) => {
  try {
    const { data } = await $authHost.delete(`api/basket/device`, {
      data: { basketId, deviceId },
    });
    return data;
  } catch (error) {
    console.error("Failed to remove device from basket:", error);
    throw error;
  }
};
export const removeAllDevicesFromBasket = async (basketId, deviceId) => {
  try {
    const { data } = await $authHost.delete(`api/basket/device/all`, {
      data: { basketId, deviceId },
    });
    return data;
  } catch (error) {
    console.error("Failed to remove all devices from basket:", error);
    throw error;
  }
};

export const createBasketIfNeeded = async (userId) => {
  try {
    const existingBasket = await getBasketByUserId(userId);

    if (existingBasket) {
      return existingBasket;
    }

    const { data } = await $authHost.post("api/basket/", { userId });
    return data;
  } catch (error) {
    console.error("Failed to create or get basket:", error);
    throw error;
  }
};

export const createBasketAndAddDevice = async (userId, deviceId) => {
  try {
    const basket = await createBasketIfNeeded(userId);
    await addDeviceToBasket(basket.id, deviceId);
    return basket;
  } catch (error) {
    console.error("Failed to create basket and add device:", error);
    throw error;
  }
};
