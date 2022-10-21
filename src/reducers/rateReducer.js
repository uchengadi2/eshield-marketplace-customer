import _ from "lodash";
import {
  FETCH_RATE,
  FETCH_RATES,
  EDIT_RATE,
  DELETE_RATE,
  CREATE_RATE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RATES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_RATE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_RATE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RATE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RATE:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
