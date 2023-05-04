import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//make create income action
export const createInc = createAsyncThunk(
  "income/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `http://localhost:8000/api/income`,
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

//make update income action
export const updateInc = createAsyncThunk(
  "income/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.put(
        `http://localhost:8000/api/income/` +
          payload?.id +
          "/update",
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

// fetch single income action
export const fetchSingleInc = createAsyncThunk(
  "income/fetchSingle",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        "http://localhost:8000/api/income/" +
          payload?.id +
          "?page=" +
          payload?.page,
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

// fetch single income action
export const fetchSingleIncwop = createAsyncThunk(
  "income/fetchSinglewop",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        "http://localhost:8000/api/income/wop/" +
          payload?.id,
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

//make delete income action
// export const deleteInc = createAsyncThunk(
//   "income/delete",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     // GET TOKEN FROM STATE
//     const state = getState();
//     const token = state?.users?.userAuth?.token;
//     // console.log("Bearer: " + token);
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer:" + token,
//       },
//     };
//     try {
//       //make http call here
//       const { data } = await axios.delete(
//         `http://localhost:8080/api/income/` + payload?.id + "/delete",
//         payload,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

//slices

const incomeSlices = createSlice({
  name: "income",
  initialState: {
    // userAuth: userDataFromStorage,
  },
  extraReducers: (builder) => {
    //for create income action

    // handle pending state
    builder.addCase(createInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(createInc.fulfilled, (state, action) => {
      state.income = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(createInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch single action

    // handle pending state
    builder.addCase(fetchSingleInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchSingleInc.fulfilled, (state, action) => {
      state.incomeList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchSingleInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch single action WOP

    // handle pending state
    builder.addCase(fetchSingleIncwop.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchSingleIncwop.fulfilled, (state, action) => {
      state.incomeListwop = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchSingleIncwop.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Update Income
    // handle pending state
    builder.addCase(updateInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(updateInc.fulfilled, (state, action) => {
      state.incomeUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(updateInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default incomeSlices.reducer;
