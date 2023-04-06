import React from "react";
//import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { changeOwnName } from "./../../actions";

import UserChangeNameForm from "./UserChangeNameForm";
import history from "../../history";

class UserOwnNameChangeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillUnmount() {
    this.setState({ open: true });
  }

  handleMakeChangeNameDialogForm = () => {
    this.props.handleMakeChangeNameDialogForm();
  };

  onSubmit = (userId, formValues, existingToken) => {
    this.props.changeOwnName(userId, formValues, existingToken);
    this.setState({ open: true });
    this.props.updateUserInfoHandler();
    this.props.handleSuccessfulCreateSnackbar(
      "You have successfully updated your details"
    );
  };

  renderFormStatusChange = () => {};

  render() {
    if (this.state.open === false) {
      return (
        <Box>
          <UserChangeNameForm
            onSubmit={this.onSubmit}
            existingToken={this.props.existingToken}
            userId={this.props.userId}
            user={this.props.user}
            handleMakeChangeNameDialogForm={
              this.props.handleMakeChangeNameDialogForm
            }
            handleSuccessfulCreateSnackbar={
              this.props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={this.props.handleFailedSnackbar}
          />
        </Box>
      );
    } else {
      this.handleMakeChangeNameDialogForm();

      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return { status: state.user.status };
};

export default connect(mapStateToProps, { changeOwnName })(
  UserOwnNameChangeContainer
);
