import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoter from "./components/AppRoter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { getBasketByUserId } from "./http/basketAPI";
import { mergeObjectsByDeviceId } from "./hooks/mergeObjectsByDeviceId";

const App = observer(() => {
  const { user, baskets } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      check()
        .then(async () => {
          const basketData = await getBasketByUserId(
            localStorage.getItem("userId")
          );
          baskets.setLengthBasket(basketData.basket_devices.length);
          const mergedBasket = mergeObjectsByDeviceId(
            basketData.basket_devices
          );
          baskets.setBasket(mergedBasket);
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }

    fetchData();
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoter />
    </BrowserRouter>
  );
});

export default App;
