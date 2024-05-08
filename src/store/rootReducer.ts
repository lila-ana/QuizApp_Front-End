import { combineReducers, Reducer } from "redux";
import { QuizState, quizReducer } from "./quizPage/quizReducer";

export interface RootState {
  quizReducer: QuizState;
}
const rootReducer: Reducer<RootState> = combineReducers({
  quizReducer,
});

export default rootReducer;
