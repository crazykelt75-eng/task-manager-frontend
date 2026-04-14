import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTask, updateTask, deleteTask } from "../services/api";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const loadTask = useCallback(async () => {
    try {
      const data = await getTask(id);
      setTask(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    loadTask();
  }, [navigate, loadTask]);

  function startEditing() {
    setNewTitle(task.title);
    setNewDescription(task.description || "");
    setEditing(true);
  }

  async function saveChanges() {
    try {
      await updateTask(task.id, { title: newTitle, description: newDescription });
      setEditing(false);
      loadTask();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeTask() {
    try {
      await deleteTask(task.id);
      navigate("/list");
    } catch (err) {
      setError(err.message);
    }
  }
  
  if (loading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  if (!task) {
    return (
      <div className="container mt-4">
        <h1>Task not found</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/list" className="btn btn-secondary mt-3">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Task Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card mt-3">
        <div className="card-body">
          {editing ? (
            <div>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
              </div>
              <button onClick={saveChanges} className="btn btn-success me-2">Save</button>
              <button onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          ) : (
            <div>
              <h3 className="card-title">{task.title}</h3>
              <p className="card-text">
                {task.description ? task.description : "No description added."}
              </p>
              <p>
                <strong>Status: </strong>
                {task.done ? "Completed" : "Not done yet"}
              </p>
              <button onClick={startEditing} className="btn btn-warning me-2">Edit</button>
              <button onClick={removeTask} className="btn btn-danger">Delete</button>
            </div>
          )}
        </div>
      </div>

      <Link to="/list" className="btn btn-secondary mt-3">Back to list</Link>
    </div>
  );
}

export default Details;