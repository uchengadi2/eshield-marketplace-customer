import React, { useState } from "react";
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
import background from "./../../logistic_assets/cover_image_1.png";
import history from "./../../history";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 120,
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

const SignInForm = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [islogged, setIsLogged] = useState(false);

  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleMakeOpenSignUpDialogStatus = () => {
    props.handleMakeOpenSignUpDialogStatus();
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    props.handleMakeCloseSignUpDialogStatus();
  };

  const handleLoginDialogOpenStatus = () => {
    props.handleLoginDialogOpenStatus();
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={signUpOpen}
        onClose={() => [
          setSignUpOpen(false),
          handleLoginDialogOpenStatus(),
          history.push("/"),
        ]}
      >
        <DialogContent>
          <LoginForm
            token={props.token}
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  // const handleFormChange = (event) => {
  //   let loginParamsNew = { ...loginParams };
  //   let val = event.target.value;
  //   loginParamsNew[event.target.name] = val;
  //   this.setState({
  //     loginParams: loginParamsNew,
  //   });
  // };

  // const login = (event) => {
  //   let email = loginParams.email;
  //   let user_password = loginParams.password;
  //   if (email === "admin" && password === "123") {
  //     localStorage.setItem("token", "T");
  //     this.setState({
  //       islogged: true,
  //     });
  //   }
  //   event.preventDefault();
  // };

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
        helperText="Email"
        variant="outlined"
        //placeholder={label}
        label={label}
        id={input.name}
        fullWidth
        type={type}
        {...input}
        {...custom}
      />
    );
  };

  const renderPasswordField = ({
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
        helperText="Password"
        variant="outlined"
        //placeholder={label}
        label={label}
        id={input.name}
        fullWidth
        type={type}
        style={{ marginTop: "1em" }}
        {...input}
        {...custom}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    // <form
    //   id="loginform"
    //   //onSubmit={handleSubmit(this.onSubmit)}
    // >
    //   <Grid item>
    //     <Grid
    //       container
    //       justifyContent="center"
    //       alignItems="center"
    //       style={{ minHeight: "100vh" }}
    //     >
    //       <Grid item lg={5}>
    //         <Card className={classes.root}>
    //           <CardContent>
    //             <Grid container direction="column">
    //               <Grid item>
    //                 <Field
    //                   name="email"
    //                   component={renderTextField}
    //                   label="Email"
    //                   type="email"
    //                   //ref="email"
    //                   //hintText="Email"
    //                   //floatingLabelText="Email"
    //                   //withRef
    //                 />
    //               </Grid>
    //               <Grid item>
    //                 <Field
    //                   name="password"
    //                   component={renderPasswordField}
    //                   label="Password"
    //                   type="password"
    //                   //hintText="Password"
    //                   //floatingLabelText="Password"
    //                 />
    //               </Grid>
    //             </Grid>
    //           </CardContent>
    //           <Grid item style={{ marginTop: "2em" }}>
    //             <Button
    //               //   disabled={
    //               //     email.length === 0 ||
    //               //     password.length === 0 ||
    //               //     emailHelper.length !== 0 ||
    //               //     passwordHelper.length !== 0
    //               //   }
    //               variant="contained"
    //               className={classes.sendButton}
    //               onClick={props.handleSubmit(onSubmit)}
    //             >
    //               Login
    //             </Button>
    //           </Grid>
    //         </Card>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </form>
    <Box className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          {/* New Route Details */}
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="loginForm"
        // onSubmit={onSubmit}
        sx={{
          width: 350,
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

        <Field
          label=""
          id="email"
          name="email"
          type="text"
          component={renderTextField}
          style={{ marginTop: 10 }}
        />

        <Field
          label=""
          id="password"
          name="password"
          type="password"
          component={renderPasswordField}
        />

        <Button
          variant="contained"
          className={classes.sendButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Login
        </Button>
        <Grid container direction="row" style={{ marginTop: 20 }}>
          <Grid item container alignItems="flex-start" style={{ width: "65%" }}>
            <Button variant="text" onClick={props.handleSubmit(onSubmit)}>
              Forget your password?
            </Button>
          </Grid>
          <Grid
            item
            container
            style={{ width: "25%", marginLeft: 10, fontSize: 10 }}
          >
            <Button
              variant="text"
              onClick={() => [setSignUpOpen(true), history.push("/")]}
            >
              Sign Uppp
            </Button>
          </Grid>
        </Grid>
        {renderSignUpForm()}
      </Box>
      {/* </form> */}
    </Box>
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

  return errors;
};

export default reduxForm({
  form: "loginForm",
  validate: validate,
})(SignInForm);
