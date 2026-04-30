import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTask, updateTask, deleteTask } from "../services/api";

function Details() {
  // this took me a while to get working
  // useParams grabs the id from the url
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const loadTask = useCallback(async () => {
    try {
      const data = await getTask(id);
      setTask(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setEditing(true);
  }

  async function saveChanges() {
    try {
      await updateTask(task.id, { title: editTitle, description: editDesc });
      setEditing(false);
      loadTask();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeTask() {
    await deleteTask(task.id);
    navigate("/list");
  }
  
  if (isLoading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  if (!task) {
    return (
      <div className="container mt-4">
        <h1>Task not found</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/list" className="btn btn-outline-success mt-3">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 style={{ color: "#15803d" }}>Task Details</h1>
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
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                ></textarea>
              </div>
              <button onClick={saveChanges} className="btn btn-success me-2">Save</button>
              <button onClick={() => setEditing(false)} className="btn btn-outline-secondary">Cancel</button>
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
              <button onClick={startEditing} className="btn btn-outline-success me-2">Edit</button>
              <button onClick={removeTask} className="btn btn-outline-danger">Delete</button>
            </div>
          )}
        </div>
      </div>

      <Link to="/list" className="btn btn-outline-success mt-3">Back to list</Link>
    </div>
  );
}

export default Details
