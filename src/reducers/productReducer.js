import _ from "lodash";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PRODUCT:
      return _.omit(state, action.payload); //note that payload is just the product id
    default:
      return state;
  }
};
