import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div>
      <h1> Home</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => history.push("/question-test")}
      >
        {" "}
        Start Time
      </Button>
    </div>
  );
}
