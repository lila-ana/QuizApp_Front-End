import * as types from "./messageActionTypes";

interface MessageState {
  msgVisible: boolean;
  msg: string;
  msgType: string;
}

const initialState: MessageState = {
  msgVisible: false,
  msg: "",
  msgType: "",
};

export const messageReducer = (
  state: MessageState = initialState,
  action: any
): MessageState => {
  switch (action.type) {
    case types.SET_MESSAGE_ERROR:
      return {
        msgVisible: true,
        msg: action.payload,
        msgType: "error",
      };
    case types.SET_MESSAGE_SUCCESS:
      return {
        msgVisible: true,
        msg: action.payload,
        msgType: "success",
      };
    case types.SET_MESSAGE_INFO:
      return {
        msgVisible: true,
        msg: action.payload,
        msgType: "info",
      };
    case types.SET_MESSAGE_NULL:
      return {
        msgVisible: false,
        msg: "",
        msgType: "",
      };
    default:
      return state;
  }
};
