import React, { useState, useId, useContext } from "react"
import { TaskContext } from "../context/TaskContext"

function TaskForm() {
  const [taskName, setTaskName] = useState("")
  const inputId = useId()
  const { tasks, addTask } = useContext(TaskContext)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = taskName.trim()
    if (!trimmed) return

    const alreadyExists = tasks.some(
      (task) => task.title.toLowerCase() === trimmed.toLowerCase()
    )
    if (alreadyExists) return

    addTask(trimmed)
    setTaskName("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
