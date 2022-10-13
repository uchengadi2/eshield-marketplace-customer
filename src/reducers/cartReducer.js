import _ from "lodash";
import {
  FETCH_CARTS,
  FETCH_CART,
  EDIT_CART,
  DELETE_CART,
  CREATE_CART,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CARTS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CART:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CART:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CART:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CART:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
