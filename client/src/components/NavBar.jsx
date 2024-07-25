import React, { useContext } from "react";
import { Context } from "..";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/const";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import SHOP_ICON from "../assets/shopping-bag.png";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("userId");
  };

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
            КупиДевайс
          </NavLink>
          {user.isAuth ? (
            <Nav className='ml-auto' style={{ color: "white" }}>
              <Button
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ Панель
              </Button>
              <Button
                onClick={() => logOut()}
                variant='outline-light'
                style={{ marginLeft: "8px" }}
              >
                Выйти
              </Button>
              <Button
                onClick={() => navigate(BASKET_ROUTE)}
                style={{
                  background: `url(${SHOP_ICON}) no-repeat center center`,
                  width: 30,
                  height: 38,
                  marginLeft: 10,
                  backgroundSize: "cover",
                  backgroundColor: "initial",
                  borderColor: "initial",
                  padding: 5,
                }}
                className='d-flex align-items-center justify-content-center'
              ></Button>
            </Nav>
          ) : (
            <Nav className='ml-auto' style={{ color: "white" }}>
              <Button
                variant='outline-light'
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
      <br />
    </>
  );
});

export default NavBar;
