import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/Modals/CreateBrand";
import CreateType from "../components/Modals/CreateType";
import CreateDevice from "../components/Modals/CreateDevice";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <Container className='d-flex flex-column'>
      <Button
        onClick={() => setTypeVisible(true)}
        variant={"outline-dark"}
        className='mt-4 p-2'
      >
        {" "}
        Добавить тип
      </Button>
      <Button
        onClick={() => setBrandVisible(true)}
        variant={"outline-dark"}
        className='mt-4 p-2 '
      >
        {" "}
        Добавить бренд
      </Button>
      <Button
        onClick={() => setDeviceVisible(true)}
        variant={"outline-dark"}
        className='mt-4 p-2'
      >
        {" "}
        Добавить устройство
      </Button>
      <CreateBrand onHide={() => setBrandVisible(false)} show={brandVisible} />
      <CreateDevice
        onHide={() => setDeviceVisible(false)}
        show={deviceVisible}
      />
      <CreateType onHide={() => setTypeVisible(false)} show={typeVisible} />
    </Container>
  );
};

export default Admin;
