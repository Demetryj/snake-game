import { useEffect, useState } from "react";
import { Field } from "./Field/Field";
import { Button } from "./Button/Button";
import css from "./App.module.css";

export const App = () => {
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(1);
  const [playGame, setPlayGame] = useState(false);

  const handleClick = () => {
    setPlayGame(!playGame);
  };

  const incrementScore = () => {
    setScore((prevScore) => prevScore + point);
  };

  useEffect(() => {
    const cellWithFood = document.querySelector("[data-action]");
    const typeOfFood = cellWithFood?.dataset.action;

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
    <main>
      <header className={css.head}>
        <h1 className={css.title}>SnakeGame</h1>
      </header>
      <section className={css.playField}>
        {!playGame ? (
          <Button handleClick={handleClick}>Start game</Button>
        ) : (
          <>
            <p className={css.score}>Score: {score}</p>
            <div className={css.wrapper}>
              <Field score={score} incrementScore={incrementScore} />
            </div>
            <Button handleClick={handleClick}>Finish</Button>
          </>
        )}
      </section>
    </main>
  );
};
