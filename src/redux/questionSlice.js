import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    pageData: [
      // {
      //   page: 1,
      //   on: true,
      //   checked: true,
      //   annswer: "true",
      //   correctAnswer: "A",
      //   chooseAnswer: "B",
      // },
    ],
    time: null,
  },
  reducers: {
    listQuestion: (state, action) => {
      state.question = [...action.payload];
    },
    question: (state, action) => {
      // console.log("Question state 1111------------", state);
      // console.log("Question action 222------------", action.payload);
      state.pageData = state.pageData.concat(action.payload);
    },
    time: (state, action) => {
      console.log("Question state time------------", state);
      console.log("Question action time------------", action);
    },
  },
});

export const { listQuestion, question } = questionSlice.actions;

export default questionSlice.reducer;
