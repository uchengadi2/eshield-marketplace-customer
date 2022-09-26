import React from "react";
//import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { changeOwnPassword } from "./../../actions";
import SignUpForm from "../authForms/SignUpForm";
import UserChangePasswordForm from "./UserChangePasswordForm";
import history from "../../history";
import { Typography } from "@material-ui/core";

class UserOwnPasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidUpdate() {
    this.props.setToken(this.props.token);
  }

  componentWillUnmount() {
    this.setState({ open: true });
  }

  onSubmit = (formValues, existingToken) => {
    this.props.changeOwnPassword(formValues, existingToken);
    this.setState({ open: true });
  };

  handleMakeChangePasswordDialogForm = () => {
    this.props.handleMakeChangePasswordDialogForm();
  };

  render() {
    console.log(
      "this is the token at userOwnPasswordChange component:",
      this.props.token
    );
    if (this.props.token["status"] === "success") {
      return (
        <Box>
          <UserChangePasswordForm
            onSubmit={this.onSubmit}
            existingToken={this.props.existingToken}
            //   handlePasswordAlertDialog={this.handlePasswordAlertDialog}
          />
          {/* {this.renderPasswordAlert()} */}
        </Box>
      );
    } else {
      this.handleMakeChangePasswordDialogForm();
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { changeOwnPassword })(
  UserOwnPasswordChange
);
