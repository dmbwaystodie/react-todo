import { useState } from "react";
import "./App.scss";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  function remove(index) {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  function add() {
    if (inputValue == "") return;

    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  }

  function toggleCompleted(index) {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }
  return (
    <div className="app">
      <div className="form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="add a new task..."
        />
        <button onClick={add}>add</button>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <p
              className={task.completed ? "done" : ""}
              onClick={() => toggleCompleted(index)}
            >
              {task.text}
            </p>
            <button onClick={() => remove(index)}>remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
