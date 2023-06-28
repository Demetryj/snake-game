import clsx from "clsx";
import css from "./Cell.module.css";

export const Cell = ({ cellFood, cellSnake }) => {
  return (
    <div
      className={clsx(css.cell, {
        [css.cellFood]: cellFood,
        [css.cellSnake]: cellSnake,
      })}
    ></div>
  );
};
