import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field } from "./Field/Field";
import { Button } from "./Button/Button";
import { Table } from "./Table/Table";
import { GameOwer } from "./GameOwer/GameOwer";
import { fetchUsers, createUser } from "../api/apiUsers";
import css from "./App.module.css";

export const App = () => {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState(null);
  const [playGame, setPlayGame] = useState(false);
  const [finishGame, setFinishGame] = useState(false);

  const handleClickStartBtn = () => {
    if (userName === "") {
      toast.error("Please, enter name.");
      return;
    }

    const player = users.find((user) => user.userName === userName);

    if (player) {
      toast.error("This name is in use. Please, enter an other name.");
      return;
    }

    setPlayGame(true);
    setFinishGame(false);
  };

  const handleClickFinishBtn = async () => {
    if (score > 0) {
      try {
        await createUser({ userName, points: score.toString() });
        const newUsersList = await fetchUsers();
        setUsers(newUsersList);
      } catch (error) {
        console.log(error.message);
      }
    }

    setScore(0);
    setPlayGame(false);
    setFinishGame(false);
    setPoints(null);
    setUserName("");
  };

  const handleClickNewGameBtn = () => {
    setPlayGame(true);
    setScore(0);
    setFinishGame(false);
  };

  const handleInput = (e) => {
    setUserName(e.target.value.trim());
  };

  const incrementScore = () => {
    setScore(score + points);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersList = await fetchUsers();
        setUsers(usersList);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cellWithFood = document.querySelector("[data-action]");
    const typeOfFood = cellWithFood?.dataset.action;

    if (typeOfFood === "second") {
      setPoints(5);
      return;
    } else if (typeOfFood === "third") {
      setPoints(10);
    } else {
      setPoints(1);
    }
  });

  return (
    <main>
      <header className={css.head}>
        <h1 className={css.title}>SnakeGame</h1>
      </header>
      <section className={css.playField}>
        {!playGame ? (
          <>
            <input
              className={css.input}
              type="text"
              value={userName}
              placeholder="Enter name"
              onChange={handleInput}
            />
            <Button handleClick={handleClickStartBtn}>Start game</Button>
            {users.length > 0 && <Table users={users} />}
          </>
        ) : (
          <>
            <div className={css.wrapperText}>
              <p className={css.text}>User: {userName}</p>
              <p className={css.text}>Score: {score}</p>
            </div>

            {finishGame ? (
              <>
                <GameOwer />
                <div className={css.wrapperBtn}>
                  <Button handleClick={handleClickNewGameBtn}>New game</Button>
                  <Button handleClick={handleClickFinishBtn}>Finish</Button>
                </div>
              </>
            ) : (
              <>
                <div className={css.wrapper}>
                  <Field
                    score={score}
                    incrementScore={incrementScore}
                    finishPlay={() => setFinishGame(true)}
                  />
                </div>
                <Button handleClick={handleClickFinishBtn}>Finish</Button>
              </>
            )}
          </>
        )}
      </section>
      <ToastContainer />
    </main>
  );
};
