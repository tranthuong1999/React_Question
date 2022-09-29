import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  return (
    <div>
      <h1> Home</h1>
      <Button onClick={() => history.push("/question")}> StartTime</Button>
    </div>
  );
}
