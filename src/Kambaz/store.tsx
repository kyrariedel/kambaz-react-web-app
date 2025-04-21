import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/modulereducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./enrollmentsreducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
//import coursesReducer from "./Courses/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizzesReducer,
    //coursesReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;