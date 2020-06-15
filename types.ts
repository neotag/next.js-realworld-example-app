import { LOGIN, REGISTER, LOGOUT, ASYNC_START } from "./actionTypes";

export interface IAuthAction {
  type: typeof LOGIN | typeof REGISTER | typeof LOGOUT | typeof ASYNC_START;
  subtype: typeof LOGIN | typeof REGISTER;
  inProgress: boolean;
  error: Error;
  errors: Error[] | null;
  payload: {
    user: object;
    errors: Error[];
  };
}

export interface IState {
  counter?: number;
  user?: any;
}
