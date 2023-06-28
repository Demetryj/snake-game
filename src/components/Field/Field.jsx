import { useEffect, useState } from "react";
import { Cell } from "../Cell/Cell";
import { GameOwer } from "../Game/GameOwer";
import { useInterval } from "../../hooks/useInterval";
import { FIELD_ROW, DIRECTION } from "../../constants/constants";
import { getCell, nextSnakePosition } from "../../utils//moveSnake";

export const Field = ({ incrementScore }) => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState(DIRECTION.RIGHT);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (e) => {
    switch (e.key) {
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

      default:
        break;
    }
  };

  const [head, ...body] = snake;
  const intersectsWithBody = body.some(
    (item) => item.x === head.x && item.y === head.y
  );

  useInterval(
    () => setSnake(nextSnakePosition(snake, direction, incrementScore)),
    intersectsWithBody ? null : 500
  );

  return (
    <div
      style={{
        display: "flex",
      }}
    >
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
