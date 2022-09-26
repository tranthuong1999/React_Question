import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getQuestion } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { question } from "../../redux/questionSlice";

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
    if (answer) {
      dispatch(
        question({
          on,
          checked,
          answer,
          chooseAnswer,
          correctAnswer,
          page: currentPage,
        })
      );
    }
    console.log("Component 1111111111");

    return () => {
      console.log("Component unmount22222");
    };
  }, [answer]);

  const handleChangeValue = (e) => {
    console.log("Dap an da choose");
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

  console.log("Answer---------", answer);

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
        <FormControl>
          <h2>
            {currentQuestionIndex + 1}.
            {listQuestion[currentQuestionIndex]?.question}{" "}
          </h2>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChangeValue}
          >
            <FormControlLabel
              value={listQuestion[currentQuestionIndex]?.optionA}
              control={<Radio />}
              label={listQuestion[currentQuestionIndex]?.optionA}
              disabled={questionData[currentQuestionIndex]?.on}
            />
            <FormControlLabel
              value={listQuestion[currentQuestionIndex]?.optionB}
              control={<Radio />}
              label={listQuestion[currentQuestionIndex]?.optionB}
              disabled={questionData[currentQuestionIndex]?.on}
            />
            <FormControlLabel
              value={listQuestion[currentQuestionIndex]?.optionC}
              control={<Radio />}
              label={listQuestion[currentQuestionIndex]?.optionC}
              disabled={questionData[currentQuestionIndex]?.on}
            />
            <FormControlLabel
              value={listQuestion[currentQuestionIndex]?.optionD}
              control={<Radio />}
              label={listQuestion[currentQuestionIndex]?.optionD}
              disabled={questionData[currentQuestionIndex]?.on}
            />
          </RadioGroup>
        </FormControl>
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
