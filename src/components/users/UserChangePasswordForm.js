import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField, Typography } from "@material-ui/core";
import background from "./../../logistic_assets/cover_image_1.png";
import history from "./../../history";
import api from "./../../apis/local";
import { CHANGE_OWN_PASSWORD } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.1rem",
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
    marginTop: 10,
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

const renderTextField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      helperText={label}
      variant="outlined"
      id={input.name}
      fullWidth
      required={true}
      defaultValue={input.value}
      type={type}
      //{...input}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const UserChangePasswordForm = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();
  console.log("tokens:", props.token);

  const buttonContent = () => {
    return <React.Fragment>Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    if (!formValues.passwordCurrent) {
      props.handleFailedSnackbar(
        "Please enter your current password and try again"
      );
      setLoading(false);
      return;
    }
    if (!formValues.password) {
      props.handleFailedSnackbar(
        "Please enter your new password and try again"
      );
      setLoading(false);
      return;
    }
    if (!formValues.passwordConfirm) {
      props.handleFailedSnackbar(
        "Please the confirmed password field cannot be empty"
      );
      setLoading(false);
      return;
    }

    if (formValues.password !== formValues.passwordConfirm) {
      props.handleFailedSnackbar(
        "Your new Password and the Confirmed Password must be the same"
      );
      setLoading(false);
      return;
    }

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/users/updateMyPassword`, formValues);

        if (response.status === 200) {
          const token = {
            status: "success",
            token: response.data.token,
            userId: response.data.data.user.id,
          };

          props.setToken(token);
          props.setUserId(token);
          dispatch({
            type: CHANGE_OWN_PASSWORD,
            payload: response.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `You have successfully changed your password`
          );

          props.updateUserInfoHandler();
          setLoading(false);
        } else {
          props.handleFailedSnackbar("Something went wrong hereeeeeeeee");

          //props.updateUserInfoHandler();
          setLoading(false);
          //props.handleMakeChangePasswordDialogForm();

          return;
        }
      };
      createForm().catch((err) => {
        console.log("err:", err.message);
        props.handleFailedSnackbar("Something went wrong here");
        setLoading(false);

        return;
      });
    }
    props.handleMakeChangePasswordDialogForm();

    //setLoading(false);
  };

  return (
    <>
      {matchesMD ? (
        <Box className={classes.root}>
          <Grid item container justifyContent="center">
            <FormLabel
              style={{ color: "blue", fontSize: "1.5em" }}
              component="legend"
            >
              <Typography variant="h5">Change Password</Typography>
            </FormLabel>
          </Grid>
          <Box
            component="div"
            id="userChangePasswordForm"
            // onSubmit={onSubmit}
            sx={{
              width: 350,
              height: 340,
            }}
            noValidate
            autoComplete="off"
            // style={{ marginTop: 20 }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 15 }}
            >
              <Grid item>
                <Field
                  label="Current Password"
                  id="passwordCurrent"
                  name="passwordCurrent"
                  type="password"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 340 }}
                />
              </Grid>
              <Grid item>
                <Field
                  label="New Password"
                  id="password"
                  name="password"
                  //value={user.email || ""}
                  type="password"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 340 }}
                />
              </Grid>
              <Grid item>
                <Field
                  label="Confirm Password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  //value={user.email || ""}
                  type="password"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 340 }}
                />
              </Grid>
              <Button
                variant="contained"
                className={classes.sendButton}
                onClick={props.handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            </Grid>
          </Box>
        </Box>
      ) : (
        <>
          <Box className={classes.root}>
            <Grid item container justifyContent="center">
              <FormLabel
                style={{ color: "blue", fontSize: "1.5em" }}
                component="legend"
              >
                <Typography variant="h5">Change Password</Typography>
              </FormLabel>
            </Grid>
            <Box
              component="div"
              id="userChangePasswordForm"
              // onSubmit={onSubmit}
              sx={{
                width: 350,
                height: 340,
              }}
              noValidate
              autoComplete="off"
              // style={{ marginTop: 20 }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid item>
                  <Field
                    label="Current Password"
                    id="passwordCurrent"
                    name="passwordCurrent"
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    label="New Password"
                    id="password"
                    name="password"
                    //value={user.email || ""}
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    label="Confirm Password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    //value={user.email || ""}
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  onClick={props.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  let valid;

  if (!formValues.email) {
    errors.email = "Invalid email";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
  ) {
    errors.email = "Invalid email";
  }

  if (!formValues.password) {
    errors.password = "Please enter your password";
  }
  if (!formValues.passwordCurrent) {
    errors.passwordCurrent = "Please enter your current password";
  }
  if (!formValues.passwordConfirm) {
    errors.passwordConfirm = "Please re-enter the new password again";
  }
  return errors;
};

export default reduxForm({
  form: "userChangePasswordForm",
  validate: validate,
})(UserChangePasswordForm);
