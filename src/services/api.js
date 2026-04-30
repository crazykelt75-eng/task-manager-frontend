// i put all the api calls in here so i dont have to copy paste them everywhere
// saw this pattern in a youtube tutorial and it made sense

const API_URL = "https://task-manager-backend-lv2a.onrender.com"

// adds the token to requests so the server knows who you are
function getHeaders() {
  const token = localStorage.getItem("token")
  const headers = { "Content-Type": "application/json" }
  if (token) {
    headers["Authorization"] = "Bearer " + token
  }
  return headers
}

export async function getTasks() {
  const res = await fetch(API_URL + "/tasks", { headers: getHeaders() })
  console.log("getTasks status:", res.status)
  if (!res.ok) throw new Error("Failed to load tasks")
  return res.json()
}

export async function getTask(id) {
  const res = await fetch(API_URL + "/tasks/" + id, { headers: getHeaders() })
  if (!res.ok) throw new Error("Task not found")
  const data = await res.json()
  return data
}

export async function createTask(task) {
  const res = await fetch(API_URL + "/tasks", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(task)
  })

  // have to read the body to get the error message
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "Failed to create task")
  }
  return data
}

// updates a task, pass only the fields you want to change
export async function updateTask(id, updates) {
  const res = await fetch(API_URL + "/tasks/" + id, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error("Failed to update task")
  return res.json()
}

export async function deleteTask(id) {
  const res = await fetch(API_URL + "/tasks/" + id, {
    method: "DELETE",
    headers: getHeaders()
  })
  if (!res.ok) throw new Error("Could not delete task")
  return res.json()
}
