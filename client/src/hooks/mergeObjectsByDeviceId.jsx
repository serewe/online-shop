export function mergeObjectsByDeviceId(data) {
  // Создадим объект для хранения промежуточных результатов
  const deviceMap = {};
  data.forEach((item) => {
    const { deviceId } = item;
    if (deviceMap[deviceId]) {
      // Если устройство уже есть, увеличиваем количество
      deviceMap[deviceId].quantity += 1;
    } else {
      // Иначе создаем запись с quantity = 1
      deviceMap[deviceId] = {
        ...item,
        quantity: 1,
      };
    }
  });
  // Преобразуем объект обратно в массив
  return Object.values(deviceMap);
}
