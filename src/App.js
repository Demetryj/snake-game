import "./App.css";
import { Field } from "./components/Field/Field";

function App() {
  return (
    <div
      className="App"
      style={{
        color: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Snake
      <Field />
    </div>
  );
}

export default App;
