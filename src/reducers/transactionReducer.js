import _ from "lodash";
import {
  FETCH_TRANSACTION,
  FETCH_TRANSACTIONS,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
  CREATE_TRANSACTION,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TRANSACTION:
      return { ...state, status: action.payload.status };
    case EDIT_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TRANSACTION:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
