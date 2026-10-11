import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import AddTask from "./pages/addtask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:5000/api/tasks")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setTasks(data);
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);


  // Receives the complete task from AddTask
async function addTask(newTask) {
  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const savedTask = await response.json();

    setTasks((previousTasks) => [
      ...previousTasks,
      savedTask,
    ]);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function updateTask(id, updatedTask) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const savedTask = await response.json();

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? savedTask : task
      )
    );
  } catch (error) {
    console.error("Error updating task:", error);
  }
}


  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home page */}

        <Route
          path="/tasks"
          element={<Home tasks={tasks} onDeleteTask={deleteTask}   onUpdateTask={updateTask} isLoading={isLoading}/>}
        />


        {/* Add Task page */}

        <Route
          path="/tasks/new"
          element={
            <AddTask onAddTask={addTask} />
          }
        />


        {/* Any unknown URL */}

        <Route
          path="*"
          element={<Navigate to="/tasks" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;