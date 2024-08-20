import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { BASKET_ROUTE } from "../utils/const";
import {
  addRatingToDevice,
  deleteRatingToDevice,
  updateRatingToDevice,
} from "../http/ratingAPI.js";
import starFill from "../assets/starFill.svg";
import starNoFill from "../assets/starNoFill.svg";
import styles from "../styles/DevicePage.module.css";
import { createBasketAndAddDevice } from "../http/basketAPI.js";

const DevicePage = observer(() => {
  const { baskets } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const navigate = useNavigate();
  const USERID = localStorage.getItem("userId");
  const [basketTrue, setBasketTrue] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [visibleAlert, setVisibleAlert] = useState(false);

  useEffect(() => {
    const isDeviceInBasket = () => {
      return baskets.basket.some((item) => item.deviceId === device.id);
    };

    setBasketTrue(isDeviceInBasket());
  }, [baskets.basket, device.id]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const data = await fetchOneDevice(id, USERID);
        const { rating, hasUserRated, ...rest } = data;
        setDevice({ ...rest, hasUserRated });
        if (hasUserRated) {
          setUserRating(hasUserRated.rate);
        }
        setRating(rating || 0);
      } catch (error) {
        console.error("Failed to get device data:", error);
      }
    };

    fetchDeviceData();
  }, [USERID, id]);

  const postBasket = async () => {
    try {
      await createBasketAndAddDevice(USERID, device.id);
      setBasketTrue(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStarClick = async (newRating) => {
    try {
      if (userRating === null) {
        await addRatingToDevice(USERID, id, newRating);
      } else {
        await updateRatingToDevice(device.hasUserRated.id, newRating);
      }

      const updatedDevice = await fetchOneDevice(id, USERID);
      setRating(updatedDevice.rating);
      setUserRating(newRating);
      setDevice(updatedDevice);
    } catch (error) {
      console.error("Failed to add or update rating:", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      await deleteRatingToDevice(device.hasUserRated.id);
      setUserRating(null);
      setVisibleAlert(true);

      const updatedDevice = await fetchOneDevice(id, USERID);
      setRating(updatedDevice.rating);
      setDevice(updatedDevice);

      setTimeout(() => {
        setVisibleAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete rating:", error);
    }
  };

  return (
    <Container className='mt-3'>
      {visibleAlert && (
        <div
          className={`${styles.fadeIn} ${visibleAlert ? styles.visible : ""}`}
        >
          <Alert
            className='position-fixed'
            style={{
              top: "40px",
              right: "10px",
              zIndex: 10000,
              fontSize: "10px",
              width: 300,
            }}
            variant='dark'
          >
            <Alert.Heading>Ваш отзыв удален</Alert.Heading>
          </Alert>
        </div>
      )}

      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
            alt={device.name}
          />
        </Col>
        <Col md={4} className='d-flex flex-column align-items-center'>
          <Row className='d-flex flex-column align-items-center'>
            <h2>{device.name}</h2>
            {rating ? (
              <div className='d-flex flex-column align-items-center'>
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
                  {rating}
                </div>
                {userRating !== null ? (
                  <div className='d-flex align-items-center justify-content-between w-75'>
                    <h3>Ваша оценка: {userRating}</h3>
                    <Button
                      onClick={handleDeleteRating}
                      className='btn-dark'
                      style={{
                        fontSize: "1rem",
                        padding: "1vh",
                        borderRadius: 0,
                      }}
                    >
                      Удалить отзыв
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className='mt-2'
                style={{ width: 240, height: 200, fontSize: 32 }}
              >
                У данного устройства нет рейтинга
              </div>
            )}
          </Row>
          <div
            className='d-flex align-items-center justify-content-center mt-2'
            onMouseLeave={() => setHoverRating(0)}
          >
            <div
              className='d-flex align-items-center justify-content-center'
              style={{ backgroundColor: "#211529", opacity: 0.6 }}
            >
              {userRating !== null
                ? Array.from({ length: 5 }, (_, index) => (
                    <img
                      key={index}
                      src={userRating > index ? starFill : starNoFill}
                      alt='star'
                      style={{ width: 32, height: 32 }}
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(userRating)}
                      onClick={() =>
                        updateRatingToDevice(device.hasUserRated.id, index + 1)
                      }
                    />
                  ))
                : Array.from({ length: 5 }, (_, index) => (
                    <img
                      key={index}
                      src={hoverRating > index ? starFill : starNoFill}
                      alt='star'
                      style={{ width: 32, height: 32 }}
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleStarClick(index + 1)}
                    />
                  ))}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
              padding: 10,
            }}
          >
            <h3>От: {device.price} руб.</h3>
            {basketTrue ? (
              <div>
                <div className='fs-4 mb-3'>Товар находится в корзине</div>
                <div className='d-flex align-items-center'>
                  <Button
                    onClick={() => navigate(BASKET_ROUTE)}
                    variant='outline-dark'
                    className='me-2'
                  >
                    Продолжить покупки
                  </Button>
                  <Button
                    onClick={() => navigate(BASKET_ROUTE)}
                    variant='outline-dark'
                  >
                    Перейти в корзину
                  </Button>
                </div>
              </div>
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
            className={`py-2 ${index % 2 === 0 ? "bg-light" : ""}`}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
