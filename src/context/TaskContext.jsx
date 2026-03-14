import React, { createContext, useState, useEffect } from "react"

export const TaskContext = createContext()

const API_URL = "http://localhost:6001/tasks"

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err))
  }, [])

  function addTask(title) {
    const newTask = { title, completed: false }

    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((saved) => {
        setTasks((prev) => [...prev, saved])
      })
      .catch((err) => console.error("Error adding task:", err))
  }

  function toggleComplete(id) {
    const target = tasks.find((t) => t.id === id)
    if (!target) return

    const updatedCompleted = !target.completed

    return fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: updatedCompleted }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? updated : t))
        )
      })
      .catch((err) => console.error("Error toggling task:", err))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  )
}
