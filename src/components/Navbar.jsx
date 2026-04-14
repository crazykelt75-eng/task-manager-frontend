import { Link } from "react-router-dom";

function Navbar({ user, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <div>
          <Link className="nav-link d-inline text-light me-3" to="/">Home</Link>
          {user ? (
            <>
              <Link className="nav-link d-inline text-light me-3" to="/list">List</Link>
              <Link className="nav-link d-inline text-light me-3" to="/add">Add Task</Link>
              <span className="text-light me-3">Hi, {user}</span>
              <button onClick={logout} className="btn btn-sm btn-outline-light">Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link d-inline text-light me-3" to="/login">Login</Link>
              <Link className="nav-link d-inline text-light" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;