import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import cityReducer from "./cityReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";
import paymentCompleteReducer from "./paymentCompleteReducer";
import paymentPartialReducer from "./paymentPartialReducer";
import policyReducer from "./policyReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import vendorReducer from "./vendorReducer";
import ordersAssignedReducer from "./ordersAssignedReducer";
import ordersCompletedReducer from "./ordersCompletedReducer";
import orderOnTransitReducer from "./orderOnTransitReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  category: categoryReducer,
  city: cityReducer,
  order: orderReducer,
  orderAssigned: ordersAssignedReducer,
  orderCompleted: ordersCompletedReducer,
  orderOnTransit: orderOnTransitReducer,
  payment: paymentReducer,
  paymentComplete: paymentCompleteReducer,
  paymentPartial: paymentPartialReducer,
  policy: policyReducer,
  product: productReducer,
  user: userReducer,
  vendor: vendorReducer,
  transaction: transactionReducer,
});
