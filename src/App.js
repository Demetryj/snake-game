import { useEffect, useState } from "react";
import "./App.css";
import { Field } from "./components/Field/Field";

function App() {
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(1);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + point);
  };

  useEffect(() => {
    const cellWithFood = document.querySelector("[data-action]");
    const typeOfFood = cellWithFood.dataset.action;

    if (typeOfFood === "second") {
      setPoint(5);
      return;
    } else if (typeOfFood === "third") {
      setPoint(10);
    } else {
      setPoint(1);
    }
  }, [score]);

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
