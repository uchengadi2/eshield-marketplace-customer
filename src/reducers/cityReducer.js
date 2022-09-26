import _ from "lodash";
import {
  FETCH_CITY,
  FETCH_CITIES,
  EDIT_CITY,
  DELETE_CITY,
  CREATE_CITY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CITIES:
      //console.log("this state is:", state);
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_CITY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CITY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CITY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CITY:
      return _.omit(state, action.payload); //note that payload is just the city id
    default:
      return state;
  }
};
