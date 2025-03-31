import { createSlice } from "@reduxjs/toolkit";
interface User {
  role: string;
}

const initialState: { currentUser: User | null } = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
import { RootState } from "../store"; // Import RootState from store.tsx
export const isFaculty = (state: RootState) => 
    state.accountReducer.currentUser?.role === "FACULTY";
export default accountSlice.reducer;