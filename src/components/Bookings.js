import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";

import BookingForm from "./BookingForm";
import UserLogin from "./users/UserLogin";
import { createOrder } from "./../actions";

class Bookings extends React.Component {
  componentDidUpdate() {
    if (this.props.status === "success") {
      this.props.handleBookingsOpenDialogStatus();
    }
  }

  // handleBookingsOpenDialogStatus = () => {
  //   this.props.handleBookingsOpenDialogStatus();
  // };

  onSubmit = (formValues, token) => {
    this.props.createOrder(formValues, token);
  };
  render() {
   
    return (
      <Box>
        <BookingForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          userId={this.props.userId}
          handleBookingsOpenDialogStatus={
            this.props.handleBookingsOpenDialogStatus
          }
          status={this.props.status}
        />
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  return { status: state.order.status };
};

export default connect(mapStateToProps, { createOrder })(Bookings);
