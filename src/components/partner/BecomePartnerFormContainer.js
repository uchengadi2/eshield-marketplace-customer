import React from "react";
import { connect } from "react-redux";

import { createVendor } from "./../../actions";
import BecomePartnerForm from "./BecomePartnerForm";

class BecomePartnerFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
      backgroundColor: "",
      counter: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.counter < 0 && this.props.status === "success") {
      this.props.handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar();
      this.setState({ counter: 5 });
    } else if (this.state.counter < 0 && this.props.status !== undefined) {
      this.props.handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar();
      this.setState({ counter: 5 });
    }
  }

  onSubmit = (formValues) => {
    this.props.createVendor(formValues, this.props.token);
    this.setState({ counter: -1 });
  };
  render() {
    return (
      <div>
        <BecomePartnerForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

// CategoryFormContainer.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => {
  console.log("this is state after vendor creation:", state);
  return { status: state.vendor.status };
};

export default connect(mapStateToProps, { createVendor })(
  BecomePartnerFormContainer
);
