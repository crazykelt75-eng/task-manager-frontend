import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Task Manager</h1>
      <p>This is a small app I built to keep track of tasks. You can add tasks, see them in a list, open one to view details, and mark them as done.</p>

      <div className="mt-4">
        <Link to="/list" className="btn btn-primary">View Tasks</Link>
        <Link to="/add" className="btn btn-success" style={{ marginLeft: "10px" }}>Add Task</Link>
      </div>
    </div>
  );
}

export default Home;