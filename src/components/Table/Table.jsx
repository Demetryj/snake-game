import css from "./Table.module.css";

export const Table = ({ users }) => {
  return (
    <>
      <p className={css.title}>Champions</p>
      <table className={css.table}>
        <thead>
          <tr>
            <th className={css.headCell}></th>
            <th className={css.headCell}>User name</th>
            <th className={css.headCell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ _id, userName, points }, index) => (
            <tr key={_id} className={css.bodyRow}>
              <td className={css.bodyCell}>{index + 1}</td>
              <td className={css.bodyCell}>{userName}</td>
              <td className={css.bodyCell}>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
