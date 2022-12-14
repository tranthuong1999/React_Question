import React from "react";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function View() {
  const listQuestion = useSelector((state) => state.question.question);

  const questionTodo = useSelector((state) => state.question.pageData);

  console.log("Question todo---------", questionTodo);

  return (
    <div>
      {listQuestion?.map((question, index) => {
        return (
          <div key={question._id}>
            <h2>
              {" "}
              {index + 1}.{question.question}
            </h2>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={questionTodo[index]?.chooseAnswer}
            >
              {question.option.map((item, index) => {
                return (
                  <div key={index}>
                    <FormControlLabel
                      value={item}
                      label={item}
                      control={<Radio />}
                    />
                  </div>
                );
              })}
              {questionTodo[index]?.answer === "Correct" ? (
                <div> True </div>
              ) : (
                <div style={{ color: "red" }}>
                  False.{questionTodo[index]?.correct}{" "}
                </div>
              )}
            </RadioGroup>
          </div>
        );
      })}
    </div>
  );
}
