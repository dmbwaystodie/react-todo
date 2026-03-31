import { useState } from "react";
import "./App.scss";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");

  // удаление задачи
  function remove(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // добавление задачи
  function add() {
    if (inputValue == "") return;

    setTasks([
      ...tasks,
      { text: inputValue, completed: false, id: Date.now() },
    ]);
    setInputValue("");
  }

  // переключатель готовности задачи
  function toggleCompleted(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  // счетчик готовых задач
  const completedCount = tasks.filter((task) => task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
  });

  return (
    <div className="wrapper">
      <div className="app">
        <h1 className="title">todo list</h1>
        <div className="form">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") add();
            }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="add a new task..."
          />
          <button onClick={add}>add</button>
        </div>
        <div className="filters">
          <button
            className={filter === "all" ? "done" : ""}
            onClick={() => setFilter("all")}
          >
            all
          </button>
          <button
            className={filter === "completed" ? "done" : ""}
            onClick={() => setFilter("completed")}
          >
            completed
          </button>
          <button
            className={filter === "active" ? "done" : ""}
            onClick={() => setFilter("active")}
          >
            uncompleted
          </button>
        </div>
        <div className="tasks">
          {filteredTasks.map((task) => (
            <div className="task" key={task.id}>
              <p
                className={task.completed ? "done" : ""}
                onClick={() => toggleCompleted(task.id)}
              >
                {task.text}
              </p>
              <button onClick={() => remove(task.id)}>remove</button>
            </div>
          ))}
        </div>
        <p>uncompleted: {tasks.length - completedCount}</p>
        <p>completed: {completedCount}</p>
      </div>
    </div>
  );
}

export default App;
