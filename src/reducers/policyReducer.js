import _ from "lodash";
import {
  FETCH_POLICY,
  FETCH_POLICIES,
  EDIT_POLICY,
  DELETE_POLICY,
  CREATE_POLICY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POLICIES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_POLICY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_POLICY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_POLICY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_POLICY:
      return _.omit(state, action.payload); //note that payload is just the policy id
    default:
      return state;
  }
};
