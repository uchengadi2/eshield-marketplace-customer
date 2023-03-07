import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import history from "./../history";
import theme from "./ui/Theme";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import useToken from "../custom-hooks/useToken";
import useUserId from "../custom-hooks/useUserId";
import UserLogin from "./users/UserLogin";
import LoginForm from "./authForms/LoginForm";
import Header from "./ui/Header";
import IndexDashboard from "./IndexDashboard";
import Marketplace from "./../components/Marketplace";
import ShowCustomerCart from "./carts/ShowCustomerCart";
import PaymentLayout from "./PaymentLayout";
import ProfileLayout from "./ProfileLayout";
import Snackbar from "@material-ui/core/Snackbar";
import ProductsForCategory from "./products/ProductsForCategory";
import ProductDetails from "./products/ProductDetails";
import CheckoutPage from "./carts/CheckoutPage";
import Categories from "./Categories";
import VendorPartner from "./VendorPartner";
import LogisticsPartner from "./LogisticsPartner";
import Footer from "./ui/Footer";

import OrderPage from "./orders/OrderPage";
import SearchPage from "./search/SearchPage";

function App() {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [resetCookie, setResetCookie] = useState(false);
  const [cartItemForCheckout, setCartItemForCheckout] = useState(false);
  const [cartIsUpdatedAfterRemoval, setCartIsUpdatedAfterRemoval] =
    useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleSuccessfulCreateSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const handleCartItemForCheckoutBox = () => {
    setCartItemForCheckout(true);
  };

  const renderCartUpdateAfterRemoval = () => {
    setCartIsUpdatedAfterRemoval(true);
    //console.log("this was run");
  };

  const resetUserCookie = () => {
    setResetCookie(true);
    //console.log("this is performed");
  };

  // useEffect(() => {
  //   setResetCookie(false);
  //   setToken("");
  //   setUserId("");
  //   //console.log("this is performed again");
  // }, [resetCookie]);

  return (
    <div className="wrapper">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            token={token}
            userId={userId}
            // setToken={setToken ? setToken : {}}
            // setUserId={setUserId ? setUserId : {}}
            setToken={setToken ? setToken : null}
            setUserId={setUserId ? setUserId : null}
          />

          <Switch>
            <Route exact path="/">
              <Marketplace
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            {/* <Route path="/orders">
              <OrderLayout token={token} />
            </Route> */}

            <Route exact path="/categories">
              <Categories
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route exact path="/categories/:categoryId">
              <ProductsForCategory
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/categories/:categoryId/:productId">
              <ProductDetails
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/carts/:userId">
              <ShowCustomerCart
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
                renderCartUpdateAfterRemoval={renderCartUpdateAfterRemoval}
              />
            </Route>

            <Route path="/checkouts/:userId">
              <CheckoutPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/orders/:userId">
              <OrderPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>

            <Route path="/:categoryId/products/:searchText">
              <SearchPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route exact path="/vendors">
              <VendorPartner
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route exact path="/logistics">
              <LogisticsPartner
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/profile">
              <ProfileLayout token={token} setToken={setToken} />
            </Route>
            {/* <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route> */}
          </Switch>
        </Router>
      </ThemeProvider>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </div>
  );
}

export default App;
