import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/const";
import starfill from "../assets/starFill.svg";
const DeviceItem = ({ device }) => {
  const history = useNavigate();
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => history(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className='text-black-50 mt-1 d-flex justify-content-between'>
          <div>
            <div className='d-flex align-items-center'>
              <div>{device.rating ? device.rating : "Нет отзывов"}</div>
              <Image
                style={{
                  background: "rgb(221, 221, 221)",
                  borderRadius: "50%",
                }}
                width={24}
                height={24}
                src={device.rating ? starfill : star}
              />
            </div>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
