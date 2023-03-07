import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import useToken from "./../../custom-hooks/useToken";

import LoginForm from "../authForms/LoginForm";
import { signIn } from "./../../actions";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      counter: 0,
    };
  }
  // componentDidUpdate() {
  //   if (this.state.counter < 0 && this.props.token !== undefined) {
  //     console.log("status is:", this.props.token.status);
  //     if (this.props.token.status === "success") {
  //       this.props.handleSuccessfulLoginDialogOpenStatusWithSnackbar(
  //         "You have successfully logged in"
  //       );
  //       this.setState({ counter: 5 });
  //     } else if (this.props.token.status !== undefined) {
  //       this.props.handleFailedLoginDialogOpenStatusWithSnackbar(
  //         "Incorrect Login Credentials. Check your email and password and try again"
  //       );
  //       this.setState({ counter: 6 });
  //     }
  //   }
  // }

  componentDidUpdate() {
    this.props.handleSuccessfulLoginDialogOpenStatusWithSnackbar(
      "You have successfully logged in"
    );
  }

  onSubmit = (value) => {
    //this.props.signIn(formValues);
    this.props.setToken(value);
    this.props.setUserId(value);
  };

  handleLoginDialogOpenStatus = () => {
    this.props.handleLoginDialogOpenStatus();
  };

  handleMakeOpenSignUpDialogStatus = () => {
    this.props.handleMakeOpenSignUpDialogStatus();
  };

  handleMakeCloseSignUpDialogStatus = () => {
    this.props.handleCloseOpenSignUpDialogStatus();
  };
  handleMakeOpenForgotPasswordFormDialogStatus = () => {
    this.props.handleMakeOpenForgotPasswordFormDialogStatus();
  };

  render() {
    // if (this.props.token === undefined) {
    if (this.state.counter <= 0 || this.state.counter === 6) {
      return (
        <Box>
          <LoginForm
            onSubmit={this.onSubmit}
            handleLoginDialogOpenStatus={this.handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={
              this.handleMakeOpenSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={
              this.props.handleLoginDialogCloseStatus
            }
            handleMakeCloseSignUpDialogStatus={
              this.handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenForgotPasswordFormDialogStatus={
              this.handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              this.props.handleFailedLoginDialogOpenStatusWithSnackbar
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              this.props.handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            token={this.props.token}
          />
        </Box>
      );
    }
    // } else {
    //   this.handleLoginDialogOpenStatus();

    return null;
    // }
  }
}

// UserLogin.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { signIn })(UserLogin);
