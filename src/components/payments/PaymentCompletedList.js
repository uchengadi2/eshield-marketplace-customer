import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchCompletedPayments } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import PaymentShow from "./PaymentShow";
// import OrderAssignmentFormContainer from "./../OrderAssignmentFormContainer";
// import OrdersEdit from "./OrdersEdit";
// import OrderDelete from "./OrdersDelete";

class PaymentCompletedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      cancelOpen: false,
      assignOpen: false,
      id: null,
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchCompletedPayments(
      this.props.token,
      this.props.status,
      this.props.userId
    );
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
  };

  renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/payments/completed"),
          ]}
        >
          <DialogContent>
            <PaymentShow
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/payments/completed`),
          ]}
        >
          {/* <DialogContent>
            <OrderDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent> */}
        </Dialog>
      </>
    );
  };

  renderCancelDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.cancelOpen}
          onClose={() => [
            this.setState({ cancelOpen: false }),
            history.push(`/payments/completed`),
          ]}
        >
          <DialogContent>
            <Typography>This is the cancel dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderAssignOrderDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.assignOpen}
          onClose={() => [
            this.setState({ assignOpen: false }),
            history.push(`/payments/completed`),
          ]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderOrdersList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "orderNumber", headerName: "Order Number", width: 200 },
      { field: "paymentStatus", headerName: "Payment Status", width: 200 },
      { field: "vendor", headerName: "Vendor", width: 200 },
      { field: "customer", headerName: "Customer", width: 200 },
      {
        field: "totalAmountExpected",
        headerName: "Total Amount Expected",
        width: 200,
      },
      {
        field: "totalAmountAlreadyPaid",
        headerName: "Total Amount Already Paid",
        width: 150,
      },
      {
        field: "lastPaymentRound",
        headerName: "Last Payment Round",
        width: 150,
      },
      {
        field: "currentPaymentRound",
        headerName: "Current Payment Round",
        width: 150,
      },

      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditRoundedIcon
              onClick={() => [
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/payments/completed/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.payments.map((payment) => {
      let row = {
        numbering: ++counter,
        id: payment.id,
        orderNumber: payment.order[0],
        vendor: payment.vendor[0],
        customer: payment.customer[0],
        totalAmountExpected: payment.totalAmountExpected,
        totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
        lastPaymentAmountMade: payment.lastPaymentAmountMade,
        lastPaymentRound: payment.lastPaymentRound,
        currentPaymentRound: payment.currentPaymentRound,
        startingPaymentDate: payment.startingPaymentDate,
        lastPaymentDate: payment.lastPaymentDate,
        agreedPaymentCurrency: payment.agreedPaymentCurrency,
        preferredPaymentCurrency: payment.preferredPaymentCurrency,
        paymentStatus: payment.paymentStatus,
        initialPaymentAmountExpected:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentAmountExpected,
        initialPaymentAmountPaid:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentAmountPaid,
        dateInitialPaymentWasMade:
          payment.paymentBreakdown.initialPaymentInstallment
            .dateInitialPaymentWasMade,
        initialPaymentStatus:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentStatus,
        secondPaymentAmountExpected:
          payment.paymentBreakdown.secondInstallmentPayment
            .secondPaymentAmountExpected,
        secondPaymentAmountPaid:
          payment.paymentBreakdown.secondInstallmentPayment
            .secondPaymentAmountPaid,
        dateSecondPaymentWasMade:
          payment.paymentBreakdown.secondInstallmentPayment
            .dateSecondPaymentWasMade,
        secondPaymentStatus:
          payment.paymentBreakdown.secondInstallmentPayment.secondPaymentStatus,
        thirdPaymentAmountExpected:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdPaymentAmountExpected,
        thirdPaymentAmountPaid:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdPaymentAmountPaid,
        thirdSecondPaymentWasMade:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdSecondPaymentWasMade,
        thirdPaymentStatus:
          payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
      };
      rows.push(row);
    });
    return <DataGridContainer columns={columns} rows={rows} />;
  };

  render() {
    return (
      <>
        {this.renderDeleteDialogForm()}
        {this.renderEditDialogForm()}
        {this.renderOrdersList()}
        {this.renderCancelDialogForm()}
        {this.renderAssignOrderDialogForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { payments: Object.values(state.paymentComplete) };
};

export default connect(mapStateToProps, { fetchCompletedPayments })(
  PaymentCompletedList
);
