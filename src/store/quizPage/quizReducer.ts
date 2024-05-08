import * as actionTypes from "./quizActionTypes";
import { Reducer } from "redux";

export interface QuizState {
  quizzes: any[];
  single_quiz: any;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  single_quiz: {},
  loading: false,
  error: null,
};

const quizStart: Reducer<QuizState, any> = (state = initialState, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const quizCreateSuccess: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  return {
    ...state,
    quizzes: [...state.quizzes, action.data], // Ensure action.data is an iterable (e.g., array)
    loading: false,
    error: null,
  };
};
const quizGetSuccess: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  return {
    ...state,
    quizzes: action.data.quizzes,
    loading: false,
    error: null,
  };
};
const singleQuizGetSuccess: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  return {
    ...state,
    single_quiz: action.data,
    loading: false,
    error: null,
  };
};
const updateQuizSuccess: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  return {
    ...state,
    quizzes: state.quizzes.map((quiz) =>
      quiz.id === action.data.id ? action.data : quiz
    ),
    loading: false,
    error: null,
  };
};
const quizDeleteSuccess: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  return {
    ...state,
    quizzes: action.data,
    loading: false,
    error: null,
  };
};

const quizFail: Reducer<QuizState, any> = (state = initialState, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

export const quizReducer: Reducer<QuizState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.QUIZ_START:
      return quizStart(state, action);
    case actionTypes.CREATE_QUIZ_SUCCESS:
      return quizCreateSuccess(state, action);
    case actionTypes.GET_QUIZ:
      return quizGetSuccess(state, action);
    case actionTypes.GET_SINGLE_QUIZ:
      return singleQuizGetSuccess(state, action);
    case actionTypes.UPDATE_QUIZ:
      return updateQuizSuccess(state, action);
    case actionTypes.DELETE_QUIZ:
      return quizDeleteSuccess(state, action);
    case actionTypes.QUIZ_FAIL:
      return quizFail(state, action);

    default:
      return state;
  }
};
