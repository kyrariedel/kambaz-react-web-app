import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloreducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterreducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addreducer";
import todoReducer from "../Lab4/ReduxExamples/todos/todosreducer";
const store = configureStore({
  reducer: {helloReducer,
            counterReducer, 
            addReducer,
            todoReducer, 
            },
        });
export default store;