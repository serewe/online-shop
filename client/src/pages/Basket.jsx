import React, { useContext, useState } from "react";
import BasketCard from "../components/BasketCard";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useUpdateBaskets } from "../hooks/useUpdateBaskets";

const Basket = observer(() => {
  const { baskets } = useContext(Context);
  useUpdateBaskets();
  const [promocod, setPromocod] = useState("");
  if (baskets.lengthBasket <= 0) {
    return <div>Корзина пуста...</div>;
  }

  const calcSumm = () => {
    let sum = 0;
    for (let i = 0; i < baskets.basket.length; i++) {
      const {
        quantity,
        device: { price },
      } = baskets.basket[i];
      sum += quantity * price;
    }
    return sum.toLocaleString();
  };

  return (
    <div
      style={{
        background: "#ddd",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "sans-serif",
        fontSize: "0.8rem",
        fontWeight: "bold",
      }}
    >
      <div
        style={{
          margin: "auto",
          maxWidth: "950px",
          width: "90%",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "1rem",
          border: "transparent",
          backgroundColor: "#fff",
        }}
      >
        <div className='row'>
          <div
            className='col-md-8 cart'
            style={{
              padding: "4vh 5vh",
              borderBottomLeftRadius: "1rem",
              borderTopLeftRadius: "1rem",
            }}
          >
            <div className='title' style={{ marginBottom: "5vh" }}>
              <div className='row'>
                <div className='col'>
                  <h4>
                    <b>Корзина</b>
                  </h4>
                </div>
                <div className='col align-self-center text-right text-muted'>
                  {baskets.lengthBasket}
                </div>
              </div>
              {baskets.basket.map((device) => (
                <BasketCard key={device.id} device={device} />
              ))}
            </div>
          </div>

          <div
            className='col-md-4 summary'
            style={{
              backgroundColor: "#ddd",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
              padding: "4vh",
              color: "rgb(65, 65, 65)",
            }}
          >
            <div>
              <h5>
                <b>Информация о заказе</b>
              </h5>
            </div>
            <hr style={{ marginTop: "1.25rem" }} />
            <div className='row'>
              <div className='col text-right'></div>
            </div>
            <form>
              <p>Промокод</p>
              <input
                placeholder='Введите ваш промокод'
                value={promocod}
                onChange={(e) => setPromocod(e.target.value)}
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.137)",
                  padding: "1vh",
                  marginBottom: "4vh",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "rgb(247, 247, 247)",
                }}
              />
            </form>
            <div
              className='row'
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className='col'>ИТОГОВАЯ ЦЕНА</div>
              {calcSumm() + " руб."}
            </div>
            <button
              className='btn'
              style={{
                backgroundColor: "#000",
                borderColor: "#000",
                color: "white",
                width: "100%",
                fontSize: "0.7rem",
                marginTop: "4vh",
                padding: "1vh",
                borderRadius: 0,
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Basket;
