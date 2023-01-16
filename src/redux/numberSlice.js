import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";


const numberSlice = createSlice({
  name: "numbers",
  initialState: {
    listNumber: [],
    filterNumber: [],
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
    filterNumber : ( state , action) =>{
      state.filterNumber = state.listNumber.filter( e => e.value.toLowerCase().includes(action.payload.value.toLowerCase()))
    }
  },
  extraReducers: {

  },
});

export const { addNumber, deleteNumber, updateNumber , filterNumber } = numberSlice.actions;

export default numberSlice.reducer;
