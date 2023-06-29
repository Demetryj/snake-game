import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field } from "./Field/Field";
import { Button } from "./Button/Button";
import { Table } from "./Table/Table";
import { fetchUsers, createUser } from "../api/apiUsers";
import css from "./App.module.css";

export const App = () => {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [points, setPoints] = useState(1);
  const [playGame, setPlayGame] = useState(false);

  const handleClick = () => {
    setPlayGame(!playGame);
  };

  const handleInput = (e) => {
    setUserName(e.target.value.trim());
  };

  const incrementScore = () => {
    setScore((prevScore) => prevScore + points);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersList = await fetchUsers();
        setUsers(usersList.sort((a, b) => b.points - a.points).slice(0, 5));
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
  }, [score]);

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
            <Button handleClick={handleClick}>Start game</Button>
            {users.length > 0 && <Table users={users} />}
          </>
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
      <ToastContainer />
    </main>
  );
};
