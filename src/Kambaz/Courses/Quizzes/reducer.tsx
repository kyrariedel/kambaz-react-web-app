// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   quizzes: [],
//   selectedQuiz: null,
//   questions: [],
//   attempts: [],
//   currentAttempt: null,
//   loading: false,
//   error: null
// };

// const quizzesSlice = createSlice({
//   name: "quizzes",
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     setQuizzes: (state, action) => {
//       state.quizzes = action.payload;
//     },
//     addQuiz: (state, action) => {
//       state.quizzes = [...state.quizzes, action.payload];
//     },
//     updateQuiz: (state, action) => {
//       state.quizzes = state.quizzes.map(quiz => 
//         quiz._id === action.payload._id ? action.payload : quiz
//       );
//       if (state.selectedQuiz?._id === action.payload._id) {
//         state.selectedQuiz = action.payload;
//       }
//     },
//     deleteQuiz: (state, action) => {
//       state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
//       if (state.selectedQuiz?._id === action.payload) {
//         state.selectedQuiz = null;
//       }
//     },
//     setSelectedQuiz: (state, action) => {
//       state.selectedQuiz = action.payload;
//     },
//     setQuestions: (state, action) => {
//       state.questions = action.payload;
//     },
//     addQuestion: (state, action) => {
//       state.questions = [...state.questions, action.payload];
//     },
//     updateQuestion: (state, action) => {
//       state.questions = state.questions.map(question => 
//         question._id === action.payload._id ? action.payload : question
//       );
//     },
//     deleteQuestion: (state, action) => {
//       state.questions = state.questions.filter(question => question._id !== action.payload);
//     },
//     setAttempts: (state, action) => {
//       state.attempts = action.payload;
//     },
//     setCurrentAttempt: (state, action) => {
//       state.currentAttempt = action.payload;
//     },
//     updateCurrentAttempt: (state, action) => {
//       state.currentAttempt = {
//         ...state.currentAttempt,
//         ...action.payload
//       };
//     }
//   }
// });

// export const {
//   setLoading,
//   setError,
//   setQuizzes,
//   addQuiz,
//   updateQuiz,
//   deleteQuiz,
//   setSelectedQuiz,
//   setQuestions,
//   addQuestion,
//   updateQuestion,
//   deleteQuestion,
//   setAttempts,
//   setCurrentAttempt,
//   updateCurrentAttempt
// } = quizzesSlice.actions;

// export default quizzesSlice.reducer;'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for our state objects
interface Quiz {
  _id: string;
  // Add other quiz properties here
  [key: string]: any;
}

interface Question {
  _id: string;
  // Add other question properties here
  [key: string]: any;
}

interface Attempt {
  _id: string;
  // Add other attempt properties here
  [key: string]: any;
}

// Define the state structure
interface QuizzesState {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
  questions: Question[];
  attempts: Attempt[];
  currentAttempt: Attempt | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  selectedQuiz: null,
  questions: [],
  attempts: [],
  currentAttempt: null,
  loading: false,
  error: null
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map(quiz => 
        quiz._id === action.payload._id ? action.payload : quiz
      );
      if (state.selectedQuiz?._id === action.payload._id) {
        state.selectedQuiz = action.payload;
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
      if (state.selectedQuiz?._id === action.payload) {
        state.selectedQuiz = null;
      }
    },
    setSelectedQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.selectedQuiz = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = [...state.questions, action.payload];
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = state.questions.map(question => 
        question._id === action.payload._id ? action.payload : question
      );
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(question => question._id !== action.payload);
    },
    setAttempts: (state, action: PayloadAction<Attempt[]>) => {
      state.attempts = action.payload;
    },
    setCurrentAttempt: (state, action: PayloadAction<Attempt | null>) => {
      state.currentAttempt = action.payload;
    },
    updateCurrentAttempt: (state, action: PayloadAction<Partial<Attempt>>) => {
      state.currentAttempt = {
        ...state.currentAttempt,
        ...action.payload
      } as Attempt;
    }
  }
});

export const {
  setLoading,
  setError,
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setSelectedQuiz,
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setAttempts,
  setCurrentAttempt,
  updateCurrentAttempt
} = quizzesSlice.actions;

export default quizzesSlice.reducer;