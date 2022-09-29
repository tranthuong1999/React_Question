import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    pageData: [],
    times: null,
  },
  reducers: {
    listQuestion: (state, action) => {
      state.question = [...action.payload];
    },
    question: (state, action) => {
      state.pageData = state.pageData.concat(action.payload);
    },
    times: (state, action) => {
      // console.log("State time ------------", state);
      // console.log("action time ------------", action.payload);
      state.times = action.payload;
    },
  },
});

export const { listQuestion, question, times, clearResults } =
  questionSlice.actions;

export default questionSlice.reducer;
