import { useCallback, useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { GameOwer } from "../Game/GameOwer";
import { useInterval } from "../../hooks/useInterval";
import { FIELD_ROW, DIRECTION } from "../../constants/constants";
import { getCell, nextSnakePosition } from "../../utils//moveSnake";
import css from "./Field.module.css";

export const Field = ({ score, incrementScore }) => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState(DIRECTION.RIGHT);
  const [speedOfSnake, setspeedOfSnake] = useState(500);
  const [memory, setMemory] = useState(0);
  const [pause, setPause] = useState(false);

  const handleKeydown = useCallback(
    (e) => {
      switch (e.code) {
        case "ArrowRight":
          setDirection(DIRECTION.RIGHT);
          break;
        case "ArrowLeft":
          setDirection(DIRECTION.LEFT);
          break;
        case "ArrowUp":
          setDirection(DIRECTION.TOP);
          break;
        case "ArrowDown":
          setDirection(DIRECTION.BOTTOM);
          break;
        case "Space":
          setPause(!pause);
          break;

        default:
          break;
      }
    },
    [pause]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    if (score >= 50 && memory === 0) {
      setMemory(50);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 100 && memory === 50) {
      setMemory(100);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 150 && memory === 100) {
      setMemory(150);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 200 && memory === 150) {
      setMemory(200);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 250 && memory === 200) {
      setMemory(250);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 300 && memory === 250) {
      setMemory(score);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 350 && memory === 300) {
      setMemory(350);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 400 && memory === 350) {
      setMemory(400);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    if (score >= 450 && memory === 400) {
      setMemory(450);
      setspeedOfSnake((prev) => prev - 50);
      return;
    }

    return;
  }, [score, memory, speedOfSnake]);

  const [head, ...body] = snake;

  const intersectsWithBody = body.some(
    (item) => item.x === head.x && item.y === head.y
  );

  useInterval(
    () => setSnake(nextSnakePosition(snake, direction, incrementScore)),
    pause ? null : speedOfSnake
  );

  return (
    <div className={css.field}>
      {intersectsWithBody ? (
        <GameOwer />
      ) : (
        FIELD_ROW.map((x) => {
          return (
            <div key={x + "X"}>
              {FIELD_ROW.map(
                (y) => getCell(x, y, snake) || <Cell key={y + "Y"} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
