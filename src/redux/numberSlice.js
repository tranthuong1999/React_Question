import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";


const numberSlice = createSlice({
  name: "numbers",
  initialState: {
    listNumber: [],
  },
  reducers: {
    addNumber: (state, action) => {

      state.listNumber = state.listNumber.concat(action.payload)
    },
    deleteNumber: (state, action) => {
      _.remove(state.listNumber, (number) => number.id === action.payload.number.id);
    },
    updateNumber: (state, action) => {
      const index = _.findIndex(state.listNumber, { id: action.payload.id });
      state.listNumber.splice(index, 1, action.payload);
    },
  },
  extraReducers: {

  },
});

export const { addNumber, deleteNumber, updateNumber } = numberSlice.actions;

export default numberSlice.reducer;
