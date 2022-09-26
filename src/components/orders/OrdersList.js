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
import { fetchOrders } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import OrderAssignmentFormContainer from "./OrderAssignmentFormContainer";
import OrdersEdit from "./OrdersEdit";
import OrderDelete from "./OrdersDelete";

class OrdersList extends React.Component {
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
    this.props.fetchOrders(
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
            history.push("/orders"),
          ]}
        >
          <DialogContent>
            <OrdersEdit
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
            history.push(`/orders`),
          ]}
        >
          <DialogContent>
            <OrderDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
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
            history.push(`/orders`),
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
            history.push(`/orders`),
          ]}
        >
          <DialogContent>
            <OrderAssignmentFormContainer
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderOrdersList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 60 },
      { field: "orderNumber", headerName: "Order Number", width: 150 },
      { field: "dateOrdered", headerName: "Date Ordered", width: 100 },
      { field: "orderedQuantity", headerName: "Ordered Quantity", width: 80 },
      { field: "status", headerName: "Status", width: 100 },
      { field: "category", headerName: "Category", width: 150 },
      {
        field: "consignmentCountry",
        headerName: "Source Country",
        width: 150,
      },
      {
        field: "destinationCountry",
        headerName: "Destination Country",
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
                history.push(`/orders/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "cancelorder",
        headerName: "",
        width: 30,
        description: "Cancel Order",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <CancelRoundedIcon
              style={{ color: "black" }}
              onClick={() => [
                this.setState({ cancelOpen: true, id: params.id }),
                history.push(`/orders/cancel/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      // {
      //   field: "assignorder",
      //   headerName: "",
      //   width: 30,
      //   description: "Assign Order",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <AssignmentIcon
      //         style={{ color: "black" }}
      //         onClick={() => [
      //           this.setState({ assignOpen: true, id: params.id }),
      //           history.push(`/orders/assign/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
      // {
      //   field: "deleteaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Delete row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <DeleteRoundedIcon
      //         style={{ color: "red" }}
      //         onClick={() => [
      //           this.setState({ deleteOpen: true, id: params.id }),
      //           history.push(`/orders/delete/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
    ];
    this.props.orders.map((order) => {
      console.log("these are the orderrrrnew:", order);
      let row = {
        numbering: ++counter,
        id: order.id,
        orderNumber: order.orderNumber,
        dateOrdered: order.dateOrdered,
        orderedQuantity: order.orderQuantity,
        status: order.status,
        consignmentCountry: order.consignmentCountry,
        destinationCountry: order.destinationCountry,
        category: order.category,
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
  console.log("this is the state:", state);
  return { orders: Object.values(state.order) };
};

export default connect(mapStateToProps, { fetchOrders })(OrdersList);
