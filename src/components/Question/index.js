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
import { question, times } from "../../redux/questionSlice";
import { useHistory } from "react-router-dom";
import View from "../View";

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
  const history = useHistory();

  const timeRest = useSelector((state) => state.question.times);

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
    return () => {
      console.log("Time unmount answer");
    };
  }, [answer]);

  // useEffect(() => {
  //   const countDownTime = Date.now() + 30000;
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const distance = countDownTime - now;
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     if (distance < 0) {
  //       clearInterval(interval);
  //       setTime({ minutes: 0, seconds: 0 });
  //       endGame();
  //     } else {
  //       setTime({
  //         minutes,
  //         seconds,
  //       });
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const handleChangeValue = (e) => {
    const str1 = e.target.value;
    console.log("Handle change----", str1);

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

  const endGame = () => {
    alert("Time out");
    setOn(true);
  };

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
    if (value > currentQuestionIndex + 1) {
      return false;
    }
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };
  dispatch(times(time));

  const handleSubmit = () => {
    console.log("Submit cliced");
  };
  const handleReset = () => {
    localStorage.clear();
  };

  console.log("Time Rest-----------------", timeRest?.seconds);

  return (
    <div className="total">
      <div className="container">
        <p>
          {" "}
          {timeRest?.minutes}:{timeRest?.seconds}
        </p>
        <div className="child1">
          <Stack spacing={2} style={{ width: "300px" }}>
            <Pagination
              count={listQuestion.length}
              shape="rounded"
              color="error"
              page={currentPage}
              onChange={handleChangePage}
            />
          </Stack>
          <div className="btn-button">
            <Button
              style={{ marginRight: "20px" }}
              variant="contained"
              color="primary"
              onClick={() => history.push("/")}
            >
              {" "}
              Back{" "}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSubmit()}
              style={{ marginRight: "20px" }}
            >
              {" "}
              Submit{" "}
            </Button>
            <Button onClick={handleReset} variant="contained" color="error">
              Reset
            </Button>
          </div>
        </div>
        <div className="child2">
          <FormControl>
            <h2>
              {currentQuestionIndex + 1}.
              {listQuestion[currentQuestionIndex]?.question}
            </h2>
            {listQuestion[currentQuestionIndex]?.option.map(
              (question, index) => {
                return (
                  <div key={index}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={handleChangeValue}
                      value={
                        questionData[currentQuestionIndex]?.chooseAnswer ?? ""
                      }
                    >
                      <FormControlLabel
                        value={question}
                        control={<Radio />}
                        label={question}
                        disabled={questionData[currentQuestionIndex]?.on}
                      />
                    </RadioGroup>
                  </div>
                );
              }
            )}
          </FormControl>
          <h3 style={{ color: "#1da1f2" }}>
            {questionData[currentQuestionIndex]?.answer === "true" && (
              <p>True</p>
            )}
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
      {/* <div className="view-result">
        <View />
      </div> */}
    </div>
  );
}
export default Question;
