import React from "react";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function ViewAnswer() {
  const listQuestion = useSelector((state) => state.question.question);

  const questionTodo = useSelector((state) => state.question.pageData);

  console.log("Question todo---------", questionTodo);

  const check = listQuestion.map((e) => {
    const chooseAnswer = questionTodo.find((item) => item.id === e._id);
    return {
      ...e,
      chooseAnswer,
    };
  });

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
              value={check[index]?.chooseAnswer?.chooseAnswer || null}
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
              {check[index]?.chooseAnswer?.chooseAnswer.localeCompare(
                check[index].answer
              ) === 0 ? (
                <p style={{ color: "green" }}>True</p>
              ) : (
                <p style={{ color: "red" }}>
                  {" "}
                  False. Correct is : {check[index].answer}
                </p>
              )}
            </RadioGroup>
          </div>
        );
      })}
    </div>
  );
}
