import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        dueDate: assignment.dueDate,
        points: assignment.points,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignment._id ? assignment : m
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

// "_id": "M101",
// "name": "Introduction to Rocket Propulsion",
// "description": "Basic principles of rocket propulsion and rocket engines.",
// "course": "RS101",
// "lessons": [
//   {
//     "_id": "L101",
//     "name": "History of Rocketry",
//     "description": "A brief history of rocketry and space exploration.",
//     "module": "M101"

// [
//     {
//         "_id": "A101",
//         "title": "Propulsion Assignment",
//         "description": "",
//         "points": 0,
//         "course": "RS101",
//         "courseId": "RS101",
//         "assignmentGroup": "ASSIGNMENTS",
//         "displayGrade": "PERCENTAGE",
//         "submissionType": "ONLINE",
//         "dueDate": "",
//         "availableDate": "",
//         "availableUntil": ""