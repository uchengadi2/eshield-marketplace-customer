import _ from "lodash";
import {
  FETCH_USER,
  FETCH_USERS,
  EDIT_USER,
  DELETE_USER,
  CREATE_USER,
  CHANGE_OWN_NAME,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_USER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_USER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_USER:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_OWN_NAME:
      console.log("this is the latest state:", state);
      return {
        ...state,
        // [action.payload.id]: action.payload,
        status: action.payload,
      };

    case DELETE_USER:
      return _.omit(state, action.payload); //note that payload is just the user id
    default:
      return state;
  }
};
