import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  authValue: { auth_key: string; id: string; role: string; enable_payment?: string};
}

// Define the initial state using that type
const initialState: AuthState = {
  authValue: null as any,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveAuthInfo: (
      state,
      // action: PayloadAction<{ auth_key: string; id: string; role: string }>
        action: PayloadAction<{ auth_key: string; id: string; role: string; enable_payment?: string}>

    ) => {
      state.authValue = action.payload;
    },
  },
});

export const { saveAuthInfo } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectedAuth = (state: RootState) => state.auth.authValue;

export default authSlice.reducer;
