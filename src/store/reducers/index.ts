import { combineReducers } from "redux";
import { router5Reducer } from "redux-router5";

export interface IApplicationState {
  router: any;
}

export const rootReducer = combineReducers<IApplicationState>({
  router: router5Reducer
});
