import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppBar, IconButton, TextField, Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
//import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import logo from "./../../assets/logo/eshield.png";
import { RouterRounded } from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import history from "../../history";
import UserLogin from "./../users/UserLogin";
import LoginForm from "../authForms/LoginForm";
import UserSignUp from "../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import UserLogOut from "../users/UserLogOut";
import { Fragment } from "react";
import ShowCustomerCart from "../carts/ShowCustomerCart";
import CheckoutPage from "../carts/CheckoutPage";
import SearchPage from "../search/SearchPage";
import { padding } from "@mui/system";
import api from "./../../apis/local";

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    //target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: 0,
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    width: "11em",
    marginLeft: -15,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "6.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "15px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "30px",
    marginRight: "10px",
    height: "45px",
    width: "100px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  cart: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "20px",
    marginRight: "10px",
    height: "45px",
    width: "100px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  search: {
    //...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "10px",
    marginRight: "0px",
    //height: "45px",
    // width: "30px",
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  checkout: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "20px",
    marginRight: "10px",
    height: "45px",
    width: "100px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    //marginLeft: "auto",
    marginLeft: 150,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    "&:hover": {},
  },
  buttonSignOut: {
    ...theme.typography.signOut,
    borderRadius: "250px",
    marginLeft: "30px",
    marginRight: "10px",
    height: "45px",
    width: "100px",
    "&:hover": {
      backgroundColor: theme.palette.common.orange,
      color: "white",
    },
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
  },
}));

const Header = (props) => {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [itemType, setItemType] = useState("");
  const [searchText, setSearchText] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
    setOpenMenu(true);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setItemType(event.target.value);
  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  console.log("the search text:", searchText);

  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };
  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(true);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(true);
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  const handleLogOutDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLogOut(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderLoginSignOffButton = () => {
    //let size = Object.values(props.token).length;
    //console.log("this size of this tokeeeen:", parseInt(size));

    if (props.token === undefined) {
      return (
        <Button
          variant="contained"
          // component={Link}
          // to="/logout"
          color="secondary"
          className={classes.button}
          //onClick={() => [setOpenLoginForm(true), history.push("/")]}
          onClick={() => [setOpenLoginForm(true)]}
        >
          Sign In
        </Button>
      );
    } else {
      return (
        <Fragment>
          {/* <ShoppingCartIcon
            style={{
              color: "secondary",
              height: 40,
              width: 40,

              marginLeft: 15,
            }}
            onClick={() => console.log("the cart clicked")}
          /> */}

          <Button
            onClick={() => <ShowCustomerCart />}
            disableRipple
            component={Link}
            to={`/carts/${props.userId}`}
            className={classes.cart}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Go to Cart
          </Button>
          <Button
            onClick={() => <CheckoutPage />}
            disableRipple
            component={Link}
            to={`/checkouts/${props.userId}`}
            className={classes.checkout}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Checkout
          </Button>
          <Button
            onClick={() => <CheckoutPage />}
            disableRipple
            component={Link}
            to={`/profile/${props.userId}`}
            className={classes.checkout}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Profile
          </Button>
          <Button
            variant="contained"
            // component={Link}
            // to="/logout"
            color="inherit"
            className={classes.buttonSignOut}
            onClick={() => [setOpenLogOut(true), history.push("/")]}
          >
            Sign Out
          </Button>
        </Fragment>
      );
    }
  };

  const menuOptions = [];

  const routes = matches
    ? // ? [{ name: "Marketplace", link: "/", activeIndex: 0 }]
      [{ name: "Orders", link: `/orders/${props.userId}`, activeIndex: 1 }]
    : [
        // { name: "Orders", link: "/orders", activeIndex: 1 },

        { name: "Orders", link: `/orders/${props.userId}`, activeIndex: 1 },
        // { name: "Profile", link: "/profile", activeIndex: 2 },
      ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              RouterRounded.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/logout":
          props.setValue(5);
          break;
        default:
          break;
      }
    });
  }, [props.value, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => {
          if (props.token !== undefined || route.link === "/") {
            return (
              <Tab
                key={`${route}${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
                aria-owns={route.ariaOwns}
                aria-haspopup={route.ariaPopup}
                onMouseOver={route.mouseOver}
              />
            );
          }
        })}
      </Tabs>
      {renderLoginSignOffButton()}
    </React.Fragment>
  );

  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        <DialogContent>
          <UserLogin
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        // onClose={() => [setOpenSignUpForm(false), history.push("/")]}
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderLogOutForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLogOut}
        onClose={() => [setOpenLogOut(false), history.push("/")]}
      >
        <DialogContent>
          <UserLogOut
            setToken={props.setToken}
            setUserId={props.setUserId}
            initiateIsSignedOut={props.initiateIsSignedOut}
            handleLogOutDialogOpenStatus={handleLogOutDialogOpenStatus}
            token={props.token}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderCategoryField = () => {
    return (
      <FormControl variant="outlined">
        {/* <InputLabel id="vendor_city">City</InputLabel> */}
        {itemType === "" ? (
          <InputLabel
            disableAnimation
            shrink={false}
            focused={false}
            id="item_type_label"
            style={{ fontSize: 11, marginTop: -8 }}
          >
            Select Category
          </InputLabel>
        ) : null}

        <Select
          labelId="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
          style={{ marginTop: 0, width: 150, height: 38, marginLeft: 0 }}
        >
          {renderCategoryList()}
        </Select>
        {/* <FormHelperText>Category</FormHelperText> */}
      </FormControl>
    );
  };

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              //   className={
              //     value === route.activeIndex
              //       ? [classes.drawerItem, classes.drawerItemSelected]
              //       : classes.drawerItem
              //   }
              className={classes.drawerItem}
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText disableTypography>{route.name}</ListItemText>
            </ListItem>
          ))}

          <ListItem
            className={classes.drawerItemEstimate}
            // onClick={() => {
            //   setOpenDrawer(false);
            //   props.setValue(5);
            // }}
            //onClick={() => [setOpenLoginForm(true), history.push("/")]}
            onClick={() => [setOpenLoginForm(true)]}
            divider
            button
            component={Link}
            to="/"
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={props.value === 5}
          >
            {props.token === undefined ? (
              <ListItemText className={classes.drawerItem} disableTypography>
                Sign In
              </ListItemText>
            ) : (
              <ListItemText className={classes.drawerItem} disableTypography>
                Sign Out
              </ListItemText>
            )}
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              onClick={() => props.setValue(0)}
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            <Box
              sx={{ backgroundColor: "white", padding: 10, borderRadius: 20 }}
            >
              {/* <TextField
                variant="outlined"
                className={classes.root}
                style={{ width: 100 }}
                InputProps={{
                  style: {
                    height: 38,
                  },
                }}
              /> */}
              {renderCategoryField()}
              <TextField
                variant="outlined"
                className={classes.root}
                style={{ width: 300, marginLeft: 10 }}
                onChange={onChangeSearchText}
                defaultValue={searchText}
                InputProps={{
                  style: {
                    height: 38,
                  },
                }}
              />
              <Button
                onClick={() => <SearchPage />}
                disableRipple
                component={Link}
                to={`/${category}/products/${searchText}`}
                className={classes.search}
              >
                Search
              </Button>
            </Box>

            {matches ? drawer : tabs}
          </Toolbar>
          {renderLoginForm()}
          {renderSignUpForm()}
          {renderForgotPasswordForm()}
          {renderLogOutForm()}
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
        </AppBar>
      </ElevationScroll>
      <Box className={classes.toolbarMargin}></Box>
    </React.Fragment>
  );
};

export default Header;
