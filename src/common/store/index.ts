import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { TAuthActions } from "./actions/auth";
import { authReducer } from "./reducers/auth";

const rootReducer = combineReducers({ auth: authReducer });

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppActions = TAuthActions;

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<TAppState, TAppActions>)
  )
);

export default store;
