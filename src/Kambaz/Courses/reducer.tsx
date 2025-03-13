import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: courses,
  selectedCourse: {
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  }
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse = {
        _id: uuidv4(),
        ...course
      };
      state.courses = [...state.courses, newCourse];
    },
    
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course) => course._id !== courseId
      );
    },
    
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    
    setSelectedCourse: (state, { payload: course }) => {
      state.selectedCourse = course;
    },
    
    updateSelectedCourseField: (
      state,
      { payload: { field, value } }
    ) => {
      state.selectedCourse = {
        ...state.selectedCourse,
        [field]: value
      };
    }
  }
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  setSelectedCourse,
  updateSelectedCourseField
} = courseSlice.actions;

export default courseSlice.reducer;