import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { getQuestion } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { question, time } from "../../redux/questionSlice";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function Question() {
  const listQuestion = useSelector((state) => state.question.question);
  const questionData = useSelector((state) => state.question.pageData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [on, setOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [chooseAnswer, setChooseAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [checked, setChecked] = useState();
  const [time, setTime] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    startTimer();

    return () => {};
  }, []);

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
  }, [answer]);

  const handleChangeValue = (e) => {
    const str1 = e.target.value;
    const str2 = listQuestion[currentQuestionIndex]?.answer;
    setCorrectAnswer(listQuestion[currentQuestionIndex]?.answer);
    setChooseAnswer(e.target.value);
    if (str1.localeCompare(str2) === 0) {
      setAnswer("true");
    }
    if (str1.localeCompare(str2) !== 0) {
      setAnswer("false");
    }
    setChecked(true);
    setOn(true);
  };

  const endGame = () => {};

  const handleBtnNext = (page) => {
    if (listQuestion.length === currentPage) {
      setCurrentQuestionIndex(currentPage - 1);
      endGame();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setOn(false);
    setAnswer();
    setCurrentPage(currentPage + 1);
  };

  const handleChangePage = (event, value) => {
    // console.log("Value22222222222---------", value);
    // console.log("currentQuestionIndex---------", currentQuestionIndex);
    // if (questionData[currentQuestionIndex]?.checked === true) {
    //   console.log("run");
    //   setCurrentPage(value);
    //   setCurrentQuestionIndex(value - 1);
    // }
    if (value > currentQuestionIndex + 1) {
      return false;
    }
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };

  const startTimer = () => {
    const countDownTime = Date.now() + 10000;
    const interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setTime(
          {
            minutes: 0,
            seconds: 0,
          },
          () => {
            alert("Time has expired!");
            endGame();
          }
        );
      } else {
        setTime({
          minutes,
          seconds,
        });
      }
    }, 1000);
  };
  console.log("Time-------", time);

  return (
    <div className="container">
      <h3>
        {time?.minutes}:{time?.seconds}
      </h3>
      <div className="child1">
        <Stack spacing={2}>
          <Pagination
            count={listQuestion.length}
            shape="rounded"
            color="error"
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
            value={questionData[currentQuestionIndex]?.chooseAnswer ?? ""}
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
          {questionData[currentQuestionIndex]?.answer === "true" && <p>True</p>}
        </h3>
        <h3 style={{ color: "#1da1f2" }}>
          {questionData[currentQuestionIndex]?.answer === "false" && (
            <p style={{ color: "red" }}>
              False.Answer correct:
              {questionData[currentQuestionIndex]?.correctAnswer}
            </p>
          )}
        </h3>
        {questionData[currentQuestionIndex]?.chooseAnswer && (
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
