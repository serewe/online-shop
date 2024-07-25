import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../Routes";
import { SHOP_ROUTE } from "../utils/const";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const AppRoter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRoter;
