import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setTasks(data);
      })
      .catch((err) => console.log("ERROR:", err));
  }, []);

  // Add task
  const addTask = () => {
    if (!title) return;

    fetch("http://127.0.0.1:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        window.location.reload();
      });
  };

  return (
    <div>
      <h2>Task Team Manager</h2>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <hr />

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;