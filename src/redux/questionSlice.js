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
      //   correctAnswer: "Xây dựng cơ sở vật chất kĩ thuật cho chủ nghĩa xã hội",
      //   chooseAnswer: "Liên Xô trở thành cường quốc kinh tế.",
      // },
    ],
  },
  reducers: {
    listQuestion: (state, action) => {
      state.question = [...action.payload];
    },
    question: (state, action) => {
      console.log("Question state------------", state);
      console.log("Question action------------", action);
      state.pageData = state.pageData.concat(action.payload);
    },
  },
});

export const { listQuestion, question } = questionSlice.actions;

export default questionSlice.reducer;
