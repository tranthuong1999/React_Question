import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getQuestion } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { question } from "../../redux/questionSlice";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

function Question() {
  const listQuestion = useSelector((state) => state.question.question);
  const questionData = useSelector((state) => state.question.pageData);

  console.log("Question data---------------", questionData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [on, setOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [chooseAnswer, setChooseAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [checked, setChecked] = useState();

  // console.log(
  //   "QuestionData questionDa --------------",
  //   questionData[currentQuestionIndex]?.checked
  // );

  const dispatch = useDispatch();
  useEffect(() => {
    getQuestion(dispatch);
    // if (answer) {
    //   dispatch(
    //     question({
    //       on,
    //       checked,
    //       answer,
    //       chooseAnswer,
    //       correctAnswer,
    //       page: currentPage,
    //     })
    //   );
    // }
    console.log("Component 1111111111");

    return () => {
      console.log("Component unmount22222");
    };
  }, [answer]);

  const handleChangeValue = (e) => {
    console.log("Dap an da choose", e.target.value);
    const str1 = e.target.value;
    const str2 = listQuestion[currentQuestionIndex]?.answer;
    setCorrectAnswer(listQuestion[currentQuestionIndex]?.answer);
    setChooseAnswer(e.target.value);
    if (str1.localeCompare(str2) === 0) {
      setAnswer("true");
      setChecked(true);
    }
    if (str1.localeCompare(str2) !== 0) {
      setAnswer("false");
      setChecked(false);
    }
    setOn(true);
  };

  const handleChangePage = (event, value) => {
    // console.log("Current -----------", value);
    // console.log("Current page -----------", currentPage);
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };

  const endTime = () => {
    alert("Het cau hoi");
  };

  const handleBtnNext = (page) => {
    console.log("Next clicked---------");
    setChecked(false);
    if (listQuestion.length === currentPage) {
      setCurrentQuestionIndex(currentPage - 1);
      endTime();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setOn(false);
    setAnswer();
    setCurrentPage(currentPage + 1);
  };

  console.log("Answer---------", chooseAnswer);

  return (
    <div className="container">
      <div className="child1">
        <Stack spacing={2}>
          <Pagination
            count={listQuestion.length}
            color="secondary"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <div className="child2">
        <h2>
          {currentQuestionIndex + 1}.
          {listQuestion[currentQuestionIndex]?.question}{" "}
        </h2>
        <Box
          sx={{ display: "flex", flexDirection: "column", ml: 3 }}
          onChange={handleChangeValue}
        >
          <FormControlLabel
            value={listQuestion[currentQuestionIndex]?.optionA}
            control={
              <Checkbox disabled={questionData[currentQuestionIndex]?.on} />
            }
            label={listQuestion[currentQuestionIndex]?.optionA}
          />
          <FormControlLabel
            value={listQuestion[currentQuestionIndex]?.optionB}
            control={
              <Checkbox disabled={questionData[currentQuestionIndex]?.on} />
            }
            label={listQuestion[currentQuestionIndex]?.optionB}
          />
          <FormControlLabel
            value={listQuestion[currentQuestionIndex]?.optionC}
            control={
              <Checkbox disabled={questionData[currentQuestionIndex]?.on} />
            }
            label={listQuestion[currentQuestionIndex]?.optionC}
          />
          <FormControlLabel
            value={listQuestion[currentQuestionIndex]?.optionD}
            control={
              <Checkbox disabled={questionData[currentQuestionIndex]?.on} />
            }
            label={listQuestion[currentQuestionIndex]?.optionD}
          />
        </Box>
        <h3 style={{ color: "#1da1f2" }}>
          {questionData[currentQuestionIndex]?.answer === "true" && (
            <p>True:{questionData[currentQuestionIndex]?.correctAnswer}</p>
          )}
        </h3>
        <h3 style={{ color: "Red" }}>
          {questionData[currentQuestionIndex]?.answer === "false" && (
            <p>
              False.Answer correct:
              {questionData[currentQuestionIndex]?.correctAnswer}
            </p>
          )}
        </h3>
        {answer && (
          <Button
            className="btn-next"
            onClick={() => handleBtnNext(currentQuestionIndex)}
          >
            {" "}
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default Question;
