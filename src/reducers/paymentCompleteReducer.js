import _ from "lodash";
import {
  FETCH_FULLFILLED_PAYMENT,
  FETCH_FULLFILLED_PAYMENTS,
  EDIT_FULLFILLED_PAYMENT,
  DELETE_FULLFILLED_PAYMENT,
  CREATE_FULLFILLED_PAYMENT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FULLFILLED_PAYMENTS:
      // console.log("this state isiiii:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_FULLFILLED_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FULLFILLED_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_FULLFILLED_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_FULLFILLED_PAYMENT:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
