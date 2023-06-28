import { FIELD_SIZE } from "../constants/constants.js";
import { Cell } from "../components/Cell/Cell.jsx";

let food = {
  x: Math.floor(Math.random() * FIELD_SIZE),
  y: Math.floor(Math.random() * FIELD_SIZE),
};

const getCell = (x, y, snake) => {
  if (food.x === x && food.y === y) {
    return <Cell cellFood />;
  }

  for (const segment of snake) {
    if (segment.x === x && segment.y === y) {
      return <Cell cellSnake />;
    }
  }
};

const limitByField = (position) => {
  if (position >= FIELD_SIZE) {
    return 0;
  }

  if (position < 0) {
    return FIELD_SIZE - 1;
  }

  return position;
};

const eatFood = (head, food) => {
  return head.x === food.x && head.y === food.y;
};

const nextSnakePosition = (snake, direction) => {
  const [head] = snake;
  const newHeadPosition = {
    x: limitByField(head.x + direction.x),
    y: limitByField(head.y + direction.y),
  };

  if (eatFood(newHeadPosition, food)) {
    food = {
      x: Math.floor(Math.random() * FIELD_SIZE),
      y: Math.floor(Math.random() * FIELD_SIZE),
    };

    return [newHeadPosition, ...snake];
  }

  return [newHeadPosition, ...snake.slice(0, -1)];
};

export { getCell, nextSnakePosition };
