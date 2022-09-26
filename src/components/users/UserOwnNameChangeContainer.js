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
  };

  renderFormStatusChange = () => {};

  render() {
    console.log("this is state in props:", this.props.status);
    console.log("ths is the current open status:", this.state.open);
    if (this.state.open === false) {
      return (
        <Box>
          <UserChangeNameForm
            onSubmit={this.onSubmit}
            existingToken={this.props.existingToken}
            userId={this.props.userId}
            handleMakeChangeNameDialogForm={
              this.props.handleMakeChangeNameDialogForm
            }
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
  console.log("this is name change status state:", state.user.status);
  return { status: state.user.status };
};

export default connect(mapStateToProps, { changeOwnName })(
  UserOwnNameChangeContainer
);
