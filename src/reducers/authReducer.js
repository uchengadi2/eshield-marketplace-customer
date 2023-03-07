import { SignUp } from "../actions";
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CHANGE_OWN_PASSWORD,
} from "./../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.data.user.id,
        data: action.payload,
        token: {
          status: action.payload.status,
          token: action.payload.token,
          userId: action.payload.data.user.id,
        },
      };

    case SIGN_UP:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.data.user.id,
        token: {
          status: action.payload.status,
          token: action.payload.token,
          userId: action.payload.data.user.id,
        },
      };
    case CHANGE_OWN_PASSWORD:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.data.user.id,
        token: {
          status: action.payload.status,
          token: action.payload.token,
          // userId: action.payload.data.user.id,
        },
      };

    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        token: { status: null, token: null },
      };

    default:
      return state;
  }
};
