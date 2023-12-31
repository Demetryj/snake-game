import { nanoid } from "nanoid";
import { FIELD_SIZE } from "../constants/constants.js";
import { Cell } from "../components/Cell/Cell.jsx";

let food = {
  x: Math.floor(Math.random() * FIELD_SIZE),
  y: Math.floor(Math.random() * FIELD_SIZE),
};

let typeOfFood = 1;

const chooseFood = () => Math.floor(Math.random() * (30 - 1) + 1);

const getCell = (x, y, snake) => {
  if (food.x === x && food.y === y) {
    if (typeOfFood <= 10) {
      return <Cell key={nanoid()} cellFirstFood data="first" />;
    } else if (typeOfFood > 20) {
      return <Cell key={nanoid()} cellSecondFood data="second" />;
    } else {
      return <Cell key={nanoid()} cellThirdFood data="third" />;
    }
  }

  for (const segment of snake) {
    if (segment.x === x && segment.y === y) {
      return <Cell key={nanoid()} cellSnake />;
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

const nextSnakePosition = (snake, direction, incrementScore) => {
  const [head] = snake;
  const newHeadPosition = {
    x: limitByField(head.x + direction.x),
    y: limitByField(head.y + direction.y),
  };

  if (eatFood(newHeadPosition, food)) {
    incrementScore();
    typeOfFood = chooseFood();
    food = {
      x: Math.floor(Math.random() * FIELD_SIZE),
      y: Math.floor(Math.random() * FIELD_SIZE),
    };

    return [newHeadPosition, ...snake];
  }

  return [newHeadPosition, ...snake.slice(0, -1)];
};

export { getCell, nextSnakePosition };
