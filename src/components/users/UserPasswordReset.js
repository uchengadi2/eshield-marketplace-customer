import React from "react";
//import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUp } from "./../../actions";
import ForgotPasswordForm from "../authForms/ForgotPasswordForm";

class UserPasswordReset extends React.Component {
  onSubmit = (formValues) => {
    //console.log(formValues);
    this.props.signUp(formValues);
  };
  handleMakeOpenLoginFormDialogStatus = () => {
    this.handleMakeOpenLoginFormDialogStatus();
  };
  render() {
    return (
      <div>
        <ForgotPasswordForm
          onSubmit={this.onSubmit}
          handleSignUpDialogOpenStatus={this.props.handleSignUpDialogOpenStatus}
          handleMakeOpenLoginFormDialogStatus={
            this.props.handleMakeOpenLoginFormDialogStatus
          }
          handleMakeCloseForgotPasswordFormDialogStatus={
            this.props.handleMakeCloseForgotPasswordFormDialogStatus
          }
        />
      </div>
    );
  }
}

export default connect(null, { signUp })(UserPasswordReset);
