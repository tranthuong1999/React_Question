import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  question,
  submits,
  onQuestion,
  resetQuestion,
  getQuestions,
} from "../../redux/questionSlice";
import { useHistory } from "react-router-dom";
import View from "../View";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Question() {
  const [answer, setAnswer] = useState("");
  const [chooseAnswer, setChooseAnswer] = useState();
  const [on, setOn] = useState(false);
  const listQuestion = useSelector((state) => state.question.question);

  const questionTodo = useSelector((state) => state.question.pageData);

  const isSubmit = useSelector((state) => state.question.submit);

  const isOnQuestion = useSelector((state) => state.question.onQuestion);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);

  const [openReset, setOpenReset] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenReset = () => {
    setOpenReset(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseReset = () => {
    setOpenReset(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    if (answer) {
      dispatch(
        question({
          chooseAnswer,
          answer,
          on,
          page: currentPage,
          correct: listQuestion[currentQuestionIndex].answer,
        })
      );
    }
  }, [answer]);

  const handleChangeValue = (e) => {
    const chooseAnswer = e.target.value;
    const answerCorrect = listQuestion[currentQuestionIndex]?.answer;
    if (chooseAnswer.localeCompare(answerCorrect) === 0) {
      setAnswer("Correct");
    }
    if (chooseAnswer.localeCompare(answerCorrect) !== 0) {
      setAnswer("False");
    }
    setChooseAnswer(chooseAnswer);
    setOn(true);
  };

  const handleChangePage = (event, value) => {
    if (value > currentQuestionIndex + 1) {
      return;
    }
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(onQuestion(true));
    dispatch(submits(true));
  };

  const handleReset = () => {
    setOpenReset(false);
    localStorage.clear();
    dispatch(submits(false));
    dispatch(resetQuestion());
    dispatch(onQuestion(false));
    setCurrentPage(1);
    setCurrentQuestionIndex(0);
  };
  const endGame = () => {
    alert("End game");
    dispatch(submits(true));
  };
  const handleBtnNext = () => {
    if (currentPage + 1 > listQuestion.length) {
      endGame();
      return;
    }
    setAnswer("");
    setCurrentPage(currentPage + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="total">
      <div className="container">
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
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen}
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClickOpenReset}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="child2">
          <h2>
            {currentQuestionIndex + 1}.
            {listQuestion[currentQuestionIndex]?.question}
          </h2>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChangeValue}
            value={questionTodo[currentQuestionIndex]?.chooseAnswer || null}
          >
            {listQuestion[currentQuestionIndex]?.option.map(
              (question, index) => {
                return (
                  <div key={index}>
                    <FormControlLabel
                      value={question}
                      control={<Radio />}
                      label={question}
                      disabled={
                        questionTodo[currentQuestionIndex]?.on || isOnQuestion
                      }
                    />
                  </div>
                );
              }
            )}
          </RadioGroup>
          <div style={{ color: "red" }}>
            {questionTodo[currentQuestionIndex]?.answer}
          </div>
          {questionTodo[currentQuestionIndex]?.chooseAnswer && (
            <Button
              style={{ marginTop: "60px" }}
              variant="contained"
              color="error"
              onClick={handleBtnNext}
            >
              Next
            </Button>
          )}
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Submit.</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to submit your test?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={openReset}
            onClose={handleCloseReset}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Submit.</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to reset your test?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseReset}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button onClick={handleReset} variant="contained">
                Reset
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="view-result">{isSubmit && <View />}</div>
    </div>
  );
}
export default Question;
