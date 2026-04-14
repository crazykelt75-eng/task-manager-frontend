import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks, updateTask, deleteTask } from "../services/api";

function List() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // load tasks when the page first opens
  useEffect(() => {
    // if no token, send them to login
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    loadTasks();
  }, [navigate]);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleDone(task) {
    try {
      await updateTask(task.id, { done: !task.done });
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <div className="container mt-4"><p>Loading tasks...</p></div>;
  }

  return (
    <div className="container mt-4">
      <h1>My Tasks</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tasks.length === 0 ? (
        <p className="mt-3">No tasks yet. Go to Add Task to create one.</p>
      ) : (
        <div className="mt-3">
          {tasks.map((task) => (
            <div key={task.id} className="card mb-2">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <input
                    type="checkbox"
                    checked={task.done === 1 || task.done === true}
                    onChange={() => toggleDone(task)}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                    {task.title}
                  </span>
                </div>
                <div>
                  <Link to={`/details/${task.id}`} className="btn btn-sm btn-info me-2">
                    View
                  </Link>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;