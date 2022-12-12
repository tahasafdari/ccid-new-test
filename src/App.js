import React from "react";
import axios from "axios";
import "./App.css";

export const dataReducer = (state, action) => {
  if (action.type === "SET_ERROR") {
    return { ...state, list: [], error: true };
  }

  if (action.type === "SET_LIST") {
    return { ...state, list: action.list, error: null };
  }

  throw new Error();
};

const initialData = {
  list: [],
  error: null,
};

const App = () => {
  const [counter, setCounter] = React.useState(0);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);

  React.useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=react")
      .then((response) => {
        dispatch({ type: "SET_LIST", list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR" });
      });
  }, []);

  return (
    <div id="root">
      <div id="counter-block">
        <h1>My Counter</h1>
        <Counter counter={counter} />

        <div id="button-box">
          <button type="button" onClick={() => setCounter(counter + 1)}>
            Increment
          </button>

          <button type="button" onClick={() => setCounter(counter - 1)}>
            Decrement
          </button>
        </div>
      </div>

      <h2>My Async Data</h2>

      {data.error && <div className="error">Error</div>}

      <ul>
        {data.list.map((item) => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const Counter = ({ counter }) => (
  <div id="counter">
    <p>{counter}</p>
  </div>
);

export default App;