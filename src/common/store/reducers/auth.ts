import { removeTokens } from "common/utils/removeTokens";
import { IUser } from "features/Users/interfaces/Users.interface";
import {
  AUTH_LOGOUT_USER,
  AUTH_USER_LOAD_SUCCESS,
  TAuthActions,
} from "../actions/auth";

export interface IAuth {
  user: IUser | null;
}

const initialState: IAuth = {
  user: null,
};

const authReducer = (state = initialState, action: TAuthActions): IAuth => {
  switch (action.type) {
    case AUTH_USER_LOAD_SUCCESS: {
      return { ...state, user: action.user };
    }

    case AUTH_LOGOUT_USER: {
      removeTokens();
      return { ...initialState };
    }
    default:
      return state;
  }
};

export { authReducer };
