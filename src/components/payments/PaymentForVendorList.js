import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import DataGridContainer from "../DataGridContainer";
// import OrdersEdit from "./OrdersEdit";
// import OrderDelete from "./OrdersDelete";
import data from "./../../apis/local";

function PaymentForVendorList(props) {
  const [paymentList, setPaymentList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [id, setId] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/payments", {
        params: { vendor: props.selectedVendor, paymentStatus: props.status },
      });

      const workingData = response.data.data.data;
      workingData.map((payment) => {
        allData.push(payment);
      });

      setPaymentList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setDeleteOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    setEditOpen(editOpen);
  };

  const renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={editOpen}
          onClose={() => [setEditOpen(false), history.push("/payments")]}
        >
          <DialogContent>
            {/* <OrdersEdit
              token={props.token}
              params={params}
              handleEditDialogOpenStatus={handleEditDialogOpenStatus}
            /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={deleteOpen}
          onClose={() => [setDeleteOpen(false), history.push(`/payments`)]}
        >
          <DialogContent>
            {/* <OrderDelete
              token={props.token}
              id={id}
              handleDialogOpenStatus={handleDialogOpenStatus}
            /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderCancelDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={cancelOpen}
          onClose={() => [setCancelOpen(false), history.push(`/payments`)]}
        >
          <DialogContent>
            <Typography>This is the cancel dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderAssignOrderDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={assignOpen}
          onClose={() => [setAssignOpen(false), history.push(`/payments`)]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderOrdersList = () => {
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
                // this.setState({
                //   editOpen: true,
                //   id: params.id,
                //   params: params.row,
                // }),
                setEditOpen(true),
                setId(params.id),
                setParams(params.row),
                history.push(`/payments/edit/${params.id}`),
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
                setCancelOpen(true),
                setId(params.id),
                history.push(`/payments/cancel/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "assignorder",
        headerName: "",
        width: 30,
        description: "Assign Order",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <AssignmentIcon
              style={{ color: "black" }}
              onClick={() => [
                setAssignOpen(true),
                setId(params.id),
                history.push(`/payments/assign/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "deleteaction",
        headerName: "",
        width: 30,
        description: "Delete row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <DeleteRoundedIcon
              style={{ color: "red" }}
              onClick={() => [
                // this.setState({ deleteOpen: true, id: params.id }),
                setDeleteOpen(true),
                setId(params.id),
                history.push(`/payments/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    paymentList.map((payment) => {
      console.log("these are the orderrrrnew:", payment);
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

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderOrdersList()}
      {renderCancelDialogForm()}
      {renderAssignOrderDialogForm()}
    </>
  );
}

export default PaymentForVendorList;
