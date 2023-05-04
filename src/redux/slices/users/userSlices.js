import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Login action

//Login action
export const loginuserAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `http://localhost:8000/api/users/login`,
        payload,
        config
      );
      //Save user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
// export const logout = createAsyncThunk(
//   "user/logout",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     try {
//       //Save user into localstorage
//       localStorage.removeItem("userInfo");
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

//register action
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `http://localhost:8000/api/users/register`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userDataFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;

//slices

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userDataFromStorage,
  },
  extraReducers: (builder) => {
    //   Login action

    builder.addCase(loginuserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle success state
    builder.addCase(loginuserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(loginuserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });

    //   Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle success state
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      // console.log(action);
      state.isRegistered = true;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });
  },
});

export default usersSlices.reducer;
