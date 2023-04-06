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
    //this.props.setToken(this.props.token);
    //this.props.setUserId(null);
    //history.push("/");
  }

  componentWillUnmount() {
    this.setState({ open: true });
    //this.props.setToken(this.props.token);
    this.props.handleMakeChangePasswordDialogForm();
  }

  handleMakeChangePasswordDialogForm = () => {
    this.props.handleMakeChangePasswordDialogForm();
  };

  onSubmit = (formValues, existingToken) => {
    this.props.changeOwnPassword(formValues, existingToken);
    this.setState({ open: true });
    this.props.setToken(null);
    this.props.setUserId(null);

    this.props.handleSuccessfulCreateSnackbar(
      "Your password is changed successfully"
    );

    history.push("/");
  };

  render() {
    return (
      <Box>
        <UserChangePasswordForm
          onSubmit={this.onSubmit}
          existingToken={this.props.existingToken}
          handleSuccessfulCreateSnackbar={
            this.props.handleSuccessfulCreateSnackbar
          }
          handleFailedSnackbar={this.props.handleFailedSnackbar}
          updateUserInfoHandler={this.props.updateUserInfoHandler}
          handleMakeChangePasswordDialogForm={
            this.handleMakeChangePasswordDialogForm
          }
        />
        {/* {this.renderPasswordAlert()} */}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { changeOwnPassword })(
  UserOwnPasswordChange
);
