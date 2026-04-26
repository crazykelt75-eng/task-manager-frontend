const API_URL = "https://task-manager-backend-lv2a.onrender.com";

// helper that adds the auth token to every request
function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function getTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to load task");
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(task)
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create task");
  }
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}