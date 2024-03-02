import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    id: "",
    name: "",
    role: "",
  },
  reducers: {
    populateUserInfo: (state, action) => {
      state.email = action.payload?.email;
      state.id = action.payload?.id;
      state.name = action.payload?.name;
      state.role = action.payload?.role;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});
export const { populateUserInfo, setRole } = userSlice.actions;

export default userSlice.reducer;
