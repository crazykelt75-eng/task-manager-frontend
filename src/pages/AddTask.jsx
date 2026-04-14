import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/api";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  async function submitTask(e) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Please enter a task title");
      return;
    }

    try {
      await createTask({ title, description });
      navigate("/list");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Add a New Task</h1>

      <form onSubmit={submitTask} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="btn btn-primary">Save Task</button>
      </form>
    </div>
  );
}

export default AddTask;

