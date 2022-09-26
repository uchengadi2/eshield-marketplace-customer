import _ from "lodash";
import {
  FETCH_CATEGORY,
  FETCH_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CATEGORY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CATEGORY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CATEGORY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CATEGORY:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
