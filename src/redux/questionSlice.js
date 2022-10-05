import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    pageData: [],
    times: null,
    submit: null,
    onQuestion: false,
  },
  reducers: {
    listQuestion: (state, action) => {
      state.question = [...action.payload];
    },
    question: (state, action) => {
      state.pageData = [
        ...new Map(
          state.pageData.concat(action.payload).map((item) => [item.page, item])
        ).values(),
      ].sort((a, b) => a.page - b.page);
    },
    times: (state, action) => {
      state.times = action.payload;
    },
    submits: (state, action) => {
      state.submit = action.payload;
    },
    onQuestion: (state, action) => {
      state.onQuestion = action.payload;
    },
    resetQuestion: (state, action) => {
      state.pageData = [];
    },
  },
});

export const {
  listQuestion,
  question,
  times,
  clearResults,
  submits,
  onQuestion,
  resetQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
