import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { BASKET_ROUTE } from "../utils/const";
import { createBasketAndAddDevice } from "../http/basketAPI";

const DevicePage = observer(() => {
  const { baskets } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const navigate = useNavigate();
  const USERID = localStorage.getItem("userId");
  const [basketTrue, setBasketTrue] = useState(false);

  useEffect(() => {
    const isDeviceInBasket = () => {
      for (let i = 0; i < baskets.basket.length; i++) {
        const { deviceId } = baskets.basket[i];
        if (deviceId === device.id) {
          return true;
        }
      }
      return false;
    };

    setBasketTrue(isDeviceInBasket());
  }, [baskets, device.id]);

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, [id]);

  const postBasket = async () => {
    try {
      await createBasketAndAddDevice(USERID, device.id);
      setBasketTrue(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center'>
            <h2>{device.name}</h2>
            <div
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
              className='d-flex align-items-center justify-content-center'
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>От: {device.price} руб.</h3>
            {basketTrue ? (
              <Button
                onClick={() => {
                  navigate(BASKET_ROUTE);
                }}
                variant='outline-dark'
              >
                Перейти в корзину
              </Button>
            ) : (
              <Button onClick={postBasket} variant='outline-dark'>
                Добавить в корзину
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
