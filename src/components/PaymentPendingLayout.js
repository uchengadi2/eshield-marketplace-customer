import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import history from "../history";
import PaymentsList from "./payments/PaymentList";
import AddPaymentForm from "./payments/AddPaymentForm";
import data from "./../apis/local";
// import VendorSelectFilter from "./filters/VendorSelectFilter";
import PaymentForVendorList from "./payments/PaymentForVendorList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-40px",
    width: 1100,
  },
  headerContainer: {
    height: 20,
    marginTop: 10,
    height: 40,
  },
  secondContainer: {
    // backgroundColor: "red",
    marginTop: 30,
    padding: 10,
    display: "none",
  },
  contentContainer: {
    // backgroundColor: "#ccab",
    height: "auto",
  },
  addButton: {
    borderRadius: 10,
    height: 30,
    width: 220,
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 5,
    fontSize: "0.75rem",
    backgroundColor: theme.palette.common.orange,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  toolbar: {
    padding: 5,
    margin: -10,
  },
}));

function PaymentPendingLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [countryList, setCountryList] = useState([{ id: "", name: "" }]);
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [vendorList, setVendorList] = useState([{ id: "", name: "" }]);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const fetchVendorData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/vendors");
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchVendorData().catch(console.error);
  }, []);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpen(false);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    console.log("the selected country iseeeeeeee:", selectedCountry);
  };

  const handleVendorChange = (value) => {
    setSelectedVendor(value);
    console.log("the selected vendor iseeeeeeee:", selectedVendor);
  };

  const width = 12;
  const status = "pending";

  console.log("the vendorslist is:", vendorList);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item container direction="column" sm={width}>
        <Grid item className={classes.headerContainer}>
          {/* <Toolbar disableGutters className={classes.toolbar}>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => [setOpen(true), history.push("/payments/new")]}
            >
              Process Payment Agreement
            </Button>
          </Toolbar> */}
        </Grid>
        <Grid item className={classes.contentContainer}>
          {/* {renderDataList()} */}
          <PaymentsList
            token={props.token}
            status={status}
            userId={props.userId}
          />
          {/* <DataGridText /> */}
        </Grid>
      </Grid>
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => [setOpen(false), history.push("/payments")]}
      >
        <DialogContent>
          <AddPaymentForm
            token={props.token}
            handleDialogOpenStatus={handleDialogOpenStatus}
          />
        </DialogContent>
      </Dialog>
      <Grid
        item
        container
        // sm={12 - width}
        direction="column"
        className={classes.secondContainer}
        justifyContent="center"
      >
        <Grid item>
          <Typography>This is the secong Inner Container</Typography>
        </Grid>
        <Grid item>
          <Typography>This is the third Inner Container</Typography>
        </Grid>
        <Grid item>
          <Typography>This is the fourth Inner Container</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PaymentPendingLayout;
