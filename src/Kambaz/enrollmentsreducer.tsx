import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "./Database";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: [...db.enrollments],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
    },
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === action.payload.user && enrollment.course === action.payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
