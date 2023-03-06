import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./apis/local";
import { CREATE_ORDER, DELETE_CART } from "./actions/types";
import history from "./history";

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

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    //publicKey: "pk_test_a05da864e0ce9986ad6cc3ff0bbaec0caf02dd9e", //eshield test
    publicKey: "pk_live_d97f9c616487f5e4e9b9f2be5ce8db274a0a4fb5", //eshield live
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

  //console.log("the product list is at paystack:", props.productList);

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
    // if (props.data) {
    //   const createForm = async () => {
    //     api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
    //     const response = await api.post(`/orders`, props.data);
    //     if (response.data.status === "success") {
    //       dispatch({
    //         type: CREATE_ORDER,
    //         payload: response.data.data.data,
    //       });
    //       history.push("/");
    //       props.handleSuccessfulCreateSnackbar(
    //         `Thank you for the order. We appreciate your patronage!`
    //       );
    //       //delete the product from the cart
    //       api.defaults.headers.common[
    //         "Authorization"
    //       ] = `Bearer ${props.token}`;
    //       await api.delete(`/carts/${props.data.cartId}`);
    //       //props.handleCartItemForCheckoutBox();
    //     } else {
    //       // props.handleFailedSnackbar(
    //       //   "Something went wrong, please try again!!!"
    //       // );
    //     }
    //   };
    //   createForm().catch((err) => {
    //     //props.handleFailedSnackbar();
    //     console.log("err:", err.message);
    //   });
    // }
    // if (!props.data.recipientName) {
    //   props.handleFailedSnackbar("the recipient field cannot be empty");
    //   return;
    // }
    // if (!props.data.recipientPhoneNumber) {
    //   props.handleFailedSnackbar(
    //     "the recipient Phone Number field cannot be empty"
    //   );
    //   return;
    // }
    // if (!props.data.recipientAddress) {
    //   props.handleFailedSnackbar("the recipient address field cannot be empty");
    //   return;
    // }
    // if (!props.data.recipientState) {
    //   props.handleFailedSnackbar("the state field cannot be empty");
    //   return;
    // }
    // if (!props.data.recipientCountry) {
    //   props.handleFailedSnackbar("the country field cannot be empty");
    //   return;
    // }
    // if (!props.data.paymentMethod) {
    //   props.handleFailedSnackbar("the payment method field cannot be empty");
    //   return;
    // }
    props.productList.map((cart, index) => {
      const data = {
        orderNumber: props.data.orderNumber,
        product: cart.product,
        orderedPrice: cart.price,
        recipientName: props.data.recipientName,
        recipientPhoneNumber: props.data.recipientPhoneNumber,
        recipientAddress: props.data.recipientAddress,
        recipientCountry: props.data.recipientCountry,
        recipientState: props.data.recipientState,
        productLocation: cart.location,
        locationCountry: cart.locationCountry,
        totalDeliveryCost: props.data.totalDeliveryCost.toFixed(2),
        //totalProductCost: totalProductCost.toFixed(2),
        productVendor: cart.productVendor,
        cartId: cart.id,
        quantityAdddedToCart: cart.quantity,
        orderedQuantity: cart.quantity,
        dateAddedToCart: cart.dateAddedToCart,
        productCurrency: cart.currency,
        paymentMethod: props.data.paymentMethod,
        paymentStatus: "paid",
        orderedBy: cart.cartHolder,
      };
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.post(`/orders`, data);
          if (response.data.status === "success") {
            dispatch({
              type: CREATE_ORDER,
              payload: response.data.data.data,
            });
            //setLoading(false);
          } else {
            props.handleFailedSnackbar(
              "Something went wrong, please try again!!!"
            );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        //props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    });
    const cartData = {
      status: "checkedout",
    };
    //remove order from cart
    props.productList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);
        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, we will process your request as soon as possible`
    );
    history.push("/");
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
