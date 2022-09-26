import React from "react";
import { connect } from "react-redux";
// import AssignOrderForm from "./AssignOrderForm";
import {} from "./../../actions";

class OrderAssignmentFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  onSubmit = (formValues) => {
    // this.props.assignOrder(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        {/* <AssignOrderForm onSubmit={this.onSubmit} token={this.props.token}/> */}
      </div>
    );
  }
}

export default connect(null, {})(OrderAssignmentFormContainer);
