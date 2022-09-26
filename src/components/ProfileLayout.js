import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
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
import background from "./../logistic_assets/cover_image_1.png";
import history from "./../history";
import data from "./../apis/local";
import UserOwnPasswordChange from "./users/UserOwnPasswordChange";
import UserOwnNameChangeContainer from "./users/UserOwnNameChangeContainer";

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
  root: {
    maxWidth: 600,
    marginTop: 70,
  },
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
}));

const ProfileLayout = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [user, setUser] = useState({});
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [nameFormOpen, setNameFormOpen] = useState(false);

  const getUserIdFromLocatStorage = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken["userId"];
  };

  const userId = getUserIdFromLocatStorage();

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
      {renderChangePasswordForm()}
      {renderChangeNameForm()}
    </Box>
  );
};

export default ProfileLayout;
