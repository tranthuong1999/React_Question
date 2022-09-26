import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/api";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function QuestionTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const listQuestion = useSelector((state) => state.question.question);

  console.log("List Question", listQuestion);

  const dispatch = useDispatch();

  useEffect(() => {
    getQuestion(dispatch);
  }, []);
  const handleChange = (e) => {
    console.log("Change Question", e.target.value);
  };

  return (
    <div>
      <Box
        sx={{ display: "flex", flexDirection: "column", ml: 3 }}
        onChange={handleChange}
      >
        <FormControlLabel
          label="Child 1"
          control={<Checkbox />}
          value="Child1"
        />
        <FormControlLabel
          label="Child 2"
          control={<Checkbox />}
          value="Child2"
        />
        <FormControlLabel
          label="Child 3"
          control={<Checkbox />}
          value="Child3"
        />
        <FormControlLabel
          label="Child 4"
          control={<Checkbox />}
          value="Child4"
        />
      </Box>
    </div>
  );
}
