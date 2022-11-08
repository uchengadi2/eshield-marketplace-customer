import _ from "lodash";
import {
  FETCH_LOGISTICSPARTNERS,
  FETCH_LOGISTICSPARTNER,
  EDIT_LOGISTICSPARTNER,
  DELETE_LOGISTICSPARTNER,
  CREATE_LOGISTICSPARTNER,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // case FETCH_ORDERS:
    //   //console.log("this state is:", state);
    //   return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_LOGISTICSPARTNERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_LOGISTICSPARTNER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_LOGISTICSPARTNER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_LOGISTICSPARTNER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LOGISTICSPARTNER:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
