import clsx from "clsx";
import css from "./Cell.module.css";

export const Cell = ({
  cellFirstFood,
  cellSecondFood,
  cellThirdFood,
  cellSnake,
}) => {
  return (
    <div
      className={clsx(css.cell, {
        [css.cellFirstFood]: cellFirstFood,
        [css.cellSecondFood]: cellSecondFood,
        [css.cellThirdFood]: cellThirdFood,
        [css.cellSnake]: cellSnake,
      })}
    ></div>
  );
};
