import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OrderForm from "./OrderForm";

import { createOrder } from "./../../actions";

class OrderFormContainer extends React.Component {
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
    this.props.createOrder(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <OrderForm onSubmit={this.onSubmit} token={this.props.token} />
      </>
    );
  }
}

export default connect(null, { createOrder })(OrderFormContainer);
