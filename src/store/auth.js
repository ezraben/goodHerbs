// import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
// import monitorReducersEnhancer from "./enhancers/monitorReducers";
// import loggerMiddleware from "./middleware/logger";
// import rootReducer from "./reducers";

const initalAuthState = {
  loggedIn: false,
  //   admin: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalAuthState,
  reducers: {
    //   increment: (state, action: PayloadAction<number>) => state + action.payload,
    userEmail(state, email) {
      state.userData.email = email.payload;
    },
    isAdmin(state, admin) {
      state.userData.admin = admin.payload;
    },
    // isAdmin(state, admin) {
    //   state.userData.admin = admin.payload;
    // },

    login(state) {
      state.loggedIn = true;
    },
    logOut(state) {
      state.loggedIn = false;
      state.userData = {};
    },
  },
});
// now available:
// authSlice.actions.increment(2);
// also available:
// authSlice.caseReducers.increment(0, { type: "increment", payload: 5 });

export const authActions = authSlice.actions;

export default authSlice.reducer;
