import { LOGIN, REGISTER, LOGOUT, ASYNC_START } from "../actionTypes";
import { IState, IAuthAction } from "../types";
import agent from "../utils/agent";

const auth = (state: IState = {}, action: IAuthAction) => {
  switch (action.type) {
    case LOGIN:
      console.log(state, action.payload);
      return {
        ...state,
        user: action.payload.user,
      };
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case LOGOUT:
      if (state.user) delete state.user;
      agent.setToken(null);
      return {
        ...state,
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }

  return state;
};

export default auth;
