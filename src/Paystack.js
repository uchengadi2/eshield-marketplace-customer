import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./apis/local";
import { CREATE_ORDER } from "./actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();
  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    publicKey: "pk_test_a05da864e0ce9986ad6cc3ff0bbaec0caf02dd9e",
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystck");
  };

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    if (props.data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/orders`, props.data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_ORDER,
            payload: response.data.data.data,
          });

          //delete the product from the cart
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          await api.delete(`/carts/${props.data.cartId}`);
          //props.handleCartItemForCheckoutBox();
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    }
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
