import { createSlice } from "@reduxjs/toolkit";

const initalAuthState = {
  loggedIn: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalAuthState,
  reducers: {
    userEmail(state, email) {
      state.userData.email = email.payload;
    },
    isAdmin(state, admin) {
      state.userData.admin = admin.payload;
    },

    login(state) {
      state.loggedIn = true;
    },
    logOut(state) {
      state.loggedIn = false;
      state.userData = {};
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
