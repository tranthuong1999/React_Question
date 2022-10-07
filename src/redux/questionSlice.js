import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async (thunkAPI) => {
    const res = await fetch("http://localhost:8000/api/questions");
    const data = await res.json();
    return data;
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    pageData: [],
    times: null,
    submit: null,
    onQuestion: false,
    loading: false,
  },
  reducers: {
    question: (state, action) => {
      state.pageData = [
        ...new Map(
          state.pageData.concat(action.payload).map((item) => [item.page, item])
        ).values(),
      ].sort((a, b) => a.page - b.page);
    },
    times: (state, action) => {
      console.log("timessssssssss", action.payload);
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
  extraReducers: {
    [getQuestions.pending]: (state) => {
      state.loading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.question = action.payload;
    },
    [getQuestions.rejected]: (state) => {
      state.loading = false;
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
