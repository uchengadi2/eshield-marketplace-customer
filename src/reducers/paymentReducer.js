import _ from "lodash";
import {
  FETCH_PAYMENT,
  FETCH_PAYMENTS,
  EDIT_PAYMENT,
  DELETE_PAYMENT,
  MAKE_PAYMENT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case MAKE_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PAYMENT:
      return _.omit(state, action.payload); //note that payload is just the payment id
    default:
      return state;
  }
};
