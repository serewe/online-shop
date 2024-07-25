import React from "react";
import {
  addDeviceToBasket,
  removeAllDevicesFromBasket,
  removeDeviceFromBasket,
} from "../http/basketAPI";
import { observer } from "mobx-react-lite";
import { useUpdateBaskets } from "../hooks/useUpdateBaskets";

const BasketCard = observer(({ device }) => {
  const updateBaskets = useUpdateBaskets();
  const data = device.device;
  const priceDevice = data.price * device.quantity;
  return (
    <div className='row border-top border-bottom'>
      <div
        className='row main align-items-center'
        style={{ margin: 0, padding: "2vh 0", width: "100%" }}
      >
        <div className='col-2' style={{ padding: "0 1vh" }}>
          <img
            className='img-fluid'
            src={process.env.REACT_APP_API_URL + data.img}
            alt='Product'
            style={{ width: "3.5rem" }}
          />
        </div>
        <div className='col' style={{ padding: "0 1vh" }}>
          <div className='row'>{data.name}</div>
        </div>
        <div
          className='col'
          style={{ display: "flex", padding: "0 1vh", userSelect: "none" }}
        >
          <div
            style={{ width: "10px ", cursor: "pointer" }}
            onClick={async () => {
              await removeDeviceFromBasket(device.basketId, data.id);
              await updateBaskets();
            }}
            href='#'
          >
            -
          </div>
          <div className='border' style={{ padding: "0 1vh", width: 100 }}>
            {device.quantity}
          </div>
          <div
            style={{ width: "10px ", cursor: "pointer", userSelect: "none" }}
            onClick={async () => {
              await addDeviceToBasket(device.basketId, data.id);
              await updateBaskets();
            }}
            href='#'
          >
            +
          </div>
        </div>
        <div className='col' style={{ padding: "0 1vh" }}>
          {priceDevice.toLocaleString() + " руб."}

          <button
            onClick={async () => {
              await removeAllDevicesFromBasket(device.basketId, data.id);
              await updateBaskets();
            }}
            className='close'
            style={{ marginLeft: "auto", fontSize: "0.7rem" }}
          >
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
});

export default BasketCard;
