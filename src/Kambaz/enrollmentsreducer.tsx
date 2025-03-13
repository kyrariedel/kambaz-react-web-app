import * as db from "./Database";

const initialState = {
  enrollments: [...db.enrollments]
};

const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "enroll":
      return {
        ...state,
        enrollments: [...state.enrollments, action.payload]
      };
    
    case "unenroll":
      return {
        ...state,
        enrollments: state.enrollments.filter(
          enrollment => 
            !(enrollment.user === action.payload.user && 
              enrollment.course === action.payload.course)
        )
      };
    
    default:
      return state;
  }
};

export default enrollmentReducer;