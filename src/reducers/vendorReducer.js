import _ from "lodash";
import {
  FETCH_VENDOR,
  FETCH_VENDORS,
  EDIT_VENDOR,
  DELETE_VENDOR,
  CREATE_VENDOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_VENDORS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_VENDOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_VENDOR:
      return { ...state, status: action.payload.status };
    case EDIT_VENDOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_VENDOR:
      return _.omit(state, action.payload); //note that payload is just the vendor id
    default:
      return state;
  }
};
