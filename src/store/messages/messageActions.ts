import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { AnyAction } from "redux";
import * as types from "./messageActionTypes";

export const authErrorHandler = (
  msg: string,
  status: number = 0
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch) => {
    if (status === 401 || msg === "The User no longer exists") {
      dispatch(setErrorMessage(msg, 401));
    }
  };
};

export const successMessage = (
  msg: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch) => {
    dispatch(setSuccessMessage(msg));
    setTimeout(() => {
      dispatch(setMessageNull());
    }, 5000);
  };
};

export const errorMessage = (
  msg: string,
  status: number = 0
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch) => {
    dispatch(setErrorMessage(msg, status));
    setTimeout(() => {
      dispatch(setMessageNull());
    }, 5000);
  };
};

export const infoMessage = (
  msg: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch) => {
    dispatch(setInfoMessage(msg));
  };
};

export const messageNull = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch: Dispatch) => {
    dispatch(setMessageNull());
  };
};

export const setErrorMessage = (msg: string, status: number = 0) => {
  return {
    type: types.SET_MESSAGE_ERROR,
    payload: msg,
    status: status,
  };
};

export const setSuccessMessage = (msg: string) => {
  return {
    type: types.SET_MESSAGE_SUCCESS,
    payload: msg,
  };
};

export const setInfoMessage = (msg: string) => {
  return {
    type: types.SET_MESSAGE_INFO,
    payload: msg,
  };
};

export const setMessageNull = () => {
  return {
    type: types.SET_MESSAGE_NULL,
  };
};
