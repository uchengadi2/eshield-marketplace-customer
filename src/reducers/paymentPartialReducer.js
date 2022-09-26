import _ from "lodash";
import {
  FETCH_PARTIAL_PAYMENT,
  FETCH_PARTIAL_PAYMENTS,
  EDIT_PARTIAL_PAYMENT,
  DELETE_PARTIAL_PAYMENT,
  CREATE_PARTIAL_PAYMENT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARTIAL_PAYMENTS:
      // console.log("this state isiiii:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PARTIAL_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PARTIAL_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PARTIAL_PAYMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PARTIAL_PAYMENT:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
