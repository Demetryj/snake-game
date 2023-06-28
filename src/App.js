import { useState } from "react";
import "./App.css";
import { Field } from "./components/Field/Field";

function App() {
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div
      className="App"
      style={{
        color: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Snake
      <p>Score: {score}</p>
      <Field incrementScore={incrementScore} />
    </div>
  );
}

export default App;
