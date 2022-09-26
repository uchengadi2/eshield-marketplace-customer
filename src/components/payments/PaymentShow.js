import React from "react";
import { connect } from "react-redux";
import { fetchPayment, editPayment } from "../../actions";
import PaymentEditForm from "./PaymentEditForm";
import PaymentShowForm from "./PaymentShowForm";

class PaymentShow extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    // this.props.editProduct(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <PaymentShowForm
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
  return { payment: state.payment[ownProps.match.params.id] };
};

export default connect(null, { fetchPayment, editPayment })(PaymentShow);
