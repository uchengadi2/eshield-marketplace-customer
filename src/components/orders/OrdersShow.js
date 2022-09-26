import React from "react";
import { connect } from "react-redux";
import { fetchOrder, editOrder } from "../../actions";
import OrderShowForm from "./OrderShowForm";

class OrdersShow extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
    console.log("tis is the props token:", this.props.token);
  }

  onSubmit = (formValues) => {
    // this.props.editOrder(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <OrderShowForm
          token={this.props.token}
          params={this.props.params}
          handleEditDialogOpenStatus={this.props.handleEditDialogOpenStatus}
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { order: state.order[ownProps.match.params.id] };
};

export default connect(null, { fetchOrder, editOrder })(OrdersShow);
