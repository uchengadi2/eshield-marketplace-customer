import _ from "lodash";
import {
  FETCH_ORDER,
  FETCH_ORDERS,
  EDIT_ORDER,
  DELETE_ORDER,
  CREATE_ORDER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ORDER:
      return { ...state, status: action.payload.status };
    case EDIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ORDER:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
