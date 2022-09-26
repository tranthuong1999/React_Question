import { listQuestion } from "./questionSlice";

export const getQuestion = async (dispatch) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/questions`);
    const data = await res.json();
    // console.log("Datasssssssss", data);
    dispatch(listQuestion(data));
  } catch (err) {
    console.log("Error ---", err);
  }
};
