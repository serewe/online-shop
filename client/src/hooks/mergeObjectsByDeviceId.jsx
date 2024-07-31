export function mergeObjectsByDeviceId(data) {
  const deviceMap = {};
  data.forEach((item) => {
    const { deviceId } = item;
    if (deviceMap[deviceId]) {
      deviceMap[deviceId].quantity += 1;
    } else {
      deviceMap[deviceId] = {
        ...item,
        quantity: 1,
      };
    }
  });

  return Object.values(deviceMap);
}
