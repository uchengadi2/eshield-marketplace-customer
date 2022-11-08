import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CallToAction from "./ui/CallToAction";
import Snackbar from "@material-ui/core/Snackbar";

import revolutionBackground from "./../assets/repeatingBackground.svg";
import infoBackground from "./../assets/infoBackground.svg";
import { Category } from "@material-ui/icons";
import ButtonArrow from "./ui/ButtonArrow";
import AboutUsFormContainer from "./aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./partner/BecomePartnerFormContainer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField, Typography } from "@material-ui/core";
import background from "./../assets/images/footage/footage_image.png";
import history from "./../history";
import data from "./../apis/local";
import UserOwnPasswordChange from "./users/UserOwnPasswordChange";
import UserOwnNameChangeContainer from "./users/UserOwnNameChangeContainer";
import UpperFooter from "./ui/UpperFooter";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.25rem",
    backgroundColor: theme.palette.common.blue,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  // root: {
  //   maxWidth: 600,
  //   marginTop: 70,
  // },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "10em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  root: {
    width: "100%",
    height: "80vh",
    marginTop: "3rem",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  footer: {
    width: "100%",
    marginTop: "15rem",
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },

  // background: {
  //   backgroundImage: `url(${background})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   //backgroundAttachment: "fixed",
  //   backgroundRepeat: "no-repeat",
  //   height: "60em",
  //   width: "100%",
  //   [theme.breakpoints.down("md")]: {
  //     // backgroundImage: `url(${mobileBackground})`,
  //     backgroundAttachment: "inherit",
  //   },
  // },
}));

const ProfileLayout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [user, setUser] = useState({});
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [nameFormOpen, setNameFormOpen] = useState(false);

  const getUserIdFromLocatStorage = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken["userId"];
  };

  const userId = getUserIdFromLocatStorage();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      let allData = [{}];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/users/${userId}`);

      const workingData = response.data.data.data;

      setUser(workingData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleMakeChangeNameDialogForm = () => {
    setNameFormOpen(false);
  };

  const handleMakeChangePasswordDialogForm = () => {
    setPasswordFormOpen(false);
  };

  const renderChangePasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={passwordFormOpen}
        onClose={() => [setPasswordFormOpen(false), history.push("/profile")]}
      >
        <DialogContent>
          <UserOwnPasswordChange
            setToken={props.setToken}
            existingToken={props.token}
            userId={userId}
            handleMakeChangePasswordDialogForm={
              handleMakeChangePasswordDialogForm
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderChangeNameForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={nameFormOpen}
        onClose={() => [setNameFormOpen(false), history.push("/profile")]}
      >
        <DialogContent>
          <UserOwnNameChangeContainer
            existingToken={props.token}
            userId={userId}
            handleMakeChangeNameDialogForm={handleMakeChangeNameDialogForm}
          />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item>
        <Box className={classes.root}>
          <Box
            component="div"
            id="profileLayout"
            // onSubmit={onSubmit}
            sx={{
              width: 1400,
              height: 480,
            }}
            noValidate
            autoComplete="off"
            // style={{ marginTop: 20 }}
          >
            <Grid container direction="row" className={classes.background}>
              <Box
                sx={{
                  width: 350,
                  height: 180,
                }}
                noValidate
                autoComplete="off"
              ></Box>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 15 }}
            >
              <Grid item>
                <Typography variant="subtitle1">{user.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{user.email}</Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  // onClick={() => setPasswordFormOpen(true)}
                  onClick={() => [setPasswordFormOpen(true)]}
                >
                  Change Password
                </Button>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: 20 }}
              >
                <Button variant="text" onClick={() => [setNameFormOpen(true)]}>
                  Change Name
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        {" "}
        {/*....INFORMATION BLOCK....*/}
      </Grid>
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
      {renderChangePasswordForm()}
      {renderChangeNameForm()}
    </Grid>
  );
};

export default ProfileLayout;
