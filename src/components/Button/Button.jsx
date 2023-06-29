import css from "./Button.module.css";

export const Button = ({ children, handleClick }) => {
  return (
    <button type="button" className={css.button} onClick={handleClick}>
      {children}
    </button>
  );
};
