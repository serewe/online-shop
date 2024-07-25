import { useContext, useEffect, useCallback } from "react";
import { getBasketByUserId } from "../http/basketAPI";
import { Context } from "..";
import { mergeObjectsByDeviceId } from "./mergeObjectsByDeviceId";

export const useUpdateBaskets = () => {
  const { baskets } = useContext(Context);

  const updateBaskets = useCallback(async () => {
    try {
      // Получаем данные корзины для текущего пользователя
      const basketData = await getBasketByUserId(
        localStorage.getItem("userId")
      );

      if (basketData && basketData.basket_devices) {
        // Обновляем состояние корзины
        baskets.setBasket(mergeObjectsByDeviceId(basketData.basket_devices));
        baskets.setLengthBasket(basketData.basket_devices.length);
      } else {
        baskets.setBasket([]);
        baskets.setLengthBasket(0);
      }
    } catch (error) {
      console.error("Failed to fetch basket data:", error);
      baskets.setBasket([]);
      baskets.setLengthBasket(0);
    }
  }, [baskets]);

  useEffect(() => {
    updateBaskets();
  }, [updateBaskets]);

  return updateBaskets;
};
