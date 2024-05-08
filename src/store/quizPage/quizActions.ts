import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import axios, { AxiosResponse, AxiosError } from "axios";
import { errorMessage, successMessage } from "../messages/messageActions";
import * as actionTypes from "./quizActionTypes";
import { API_BASE_URL } from "../../config/endpoint";

interface QuizStartAction {
  type: typeof actionTypes.QUIZ_START;
}

interface QuizCreateSuccessAction {
  type: typeof actionTypes.CREATE_QUIZ_SUCCESS;
  payload: any;
}

interface QuizGetSuccessAction {
  type: typeof actionTypes.GET_QUIZ;
  payload: any;
}

interface SingleQuizGetSuccessAction {
  type: typeof actionTypes.GET_SINGLE_QUIZ;
  payload: any;
}

interface UpdateQuizSuccessAction {
  type: typeof actionTypes.UPDATE_QUIZ;
  payload: any;
}

interface QuizDeleteSuccessAction {
  type: typeof actionTypes.DELETE_QUIZ;
  payload: any;
}

interface QuizFailAction {
  type: typeof actionTypes.QUIZ_FAIL;
  error: AxiosError<unknown, any>; // Include error property
}

// Union type for all possible actions
export type QuizActionTypes =
  | QuizStartAction
  | QuizCreateSuccessAction
  | QuizGetSuccessAction
  | SingleQuizGetSuccessAction
  | UpdateQuizSuccessAction
  | QuizDeleteSuccessAction
  | QuizFailAction;

// =============> Action creators <==========

const quizStart = (): QuizStartAction => ({
  type: actionTypes.QUIZ_START,
});

const quizCreateSuccess = (data: any): QuizCreateSuccessAction => ({
  type: actionTypes.CREATE_QUIZ_SUCCESS,
  payload: data,
});

const quizGetSuccess = (data: any): QuizGetSuccessAction => ({
  type: actionTypes.GET_QUIZ,
  payload: data,
});

const singleQuizGetSuccess = (data: any): SingleQuizGetSuccessAction => ({
  type: actionTypes.GET_SINGLE_QUIZ,
  payload: data,
});

const updateQuizSuccess = (data: any): UpdateQuizSuccessAction => ({
  type: actionTypes.UPDATE_QUIZ,
  payload: data,
});

const quizDeleteSuccess = (data: any): QuizDeleteSuccessAction => ({
  type: actionTypes.DELETE_QUIZ,
  payload: data,
});

const quizFail = (error: AxiosError<unknown, any>): QuizFailAction => ({
  type: actionTypes.QUIZ_FAIL,
  error,
});

// ==========> QUIZ CRUD <=========

export const createQuiz =
  (data: any): ThunkAction<void, RootState, unknown, QuizActionTypes> =>
  async (dispatch) => {
    dispatch(quizStart());
    console.log(data, "testing data");
    try {
      const response: AxiosResponse = await axios.post(
        `${API_BASE_URL}/posts`,
        data
      );
      dispatch(quizCreateSuccess(response.data.quiz));
      console.log("response for creating quiz", response?.data);
      dispatch(successMessage("Quiz Created Successfully!"));
    } catch (error) {
      dispatch(quizFail(error as AxiosError<unknown, any>));
      dispatch(errorMessage("Failed to create quiz"));
    }
  };

export const getQuiz =
  (): ThunkAction<void, RootState, unknown, QuizActionTypes> =>
  async (dispatch) => {
    dispatch(quizStart());
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/quiz`);
      dispatch(quizGetSuccess(response.data));
    } catch (error) {
      dispatch(quizFail(error as AxiosError<unknown, any>));
      dispatch(errorMessage("Failed to get quiz"));
    }
  };

export const getSingleQuiz =
  (quiz_id: string): ThunkAction<void, RootState, unknown, QuizActionTypes> =>
  async (dispatch) => {
    dispatch(quizStart());
    try {
      const response: AxiosResponse = await axios.get(
        `${API_BASE_URL}/quiz/${quiz_id}`
      );
      dispatch(singleQuizGetSuccess(response.data));
    } catch (error) {
      dispatch(quizFail(error as AxiosError<unknown, any>));
      dispatch(errorMessage("Failed to get Single quiz"));
    }
  };

export const updateQuiz =
  (
    id: string,
    data: any
  ): ThunkAction<void, RootState, unknown, QuizActionTypes> =>
  async (dispatch) => {
    dispatch(quizStart());
    try {
      const response: AxiosResponse = await axios.patch(
        `${API_BASE_URL}/quiz/${id}`,
        data
      );
      dispatch(updateQuizSuccess(response.data));
      dispatch(successMessage("Quiz Updated Successfully!"));
    } catch (error) {
      dispatch(quizFail(error as AxiosError<unknown, any>));
      dispatch(errorMessage("Failed to update quiz"));
    }
  };

export const deleteQuiz =
  (
    userId: string,
    data: any
  ): ThunkAction<void, RootState, unknown, QuizActionTypes> =>
  async (dispatch) => {
    dispatch(quizStart());
    try {
      await axios.delete(`${API_BASE_URL}/quiz/${userId}`);
      dispatch(
        quizDeleteSuccess(data.filter((item: any) => item.id !== userId))
      );
      dispatch(successMessage("Quiz deleted successfully!"));
    } catch (error) {
      dispatch(quizFail(error as AxiosError<unknown, any>));
      dispatch(errorMessage("Failed to delete quiz."));
    }
  };
