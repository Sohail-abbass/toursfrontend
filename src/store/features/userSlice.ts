import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
