import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();

const PORT = 5000;

// Middleware
app.use(cors())
app.use(express.json());

// Test PostgreSQL connection
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// POST a new task

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    // Validate the title
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    // Validate priority
    if (!["Low", "Medium", "High"].includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium, or High",
      });
    }

    // Validate status
    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Pending or Completed",
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title.trim(), description ?? "", priority, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});
// DELETE a task

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      task: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

// UPDATE a task

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!["Low", "Medium", "High"].includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium, or High",
      });
    }

    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Pending or Completed",
      });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           priority = $3,
           status = $4
       WHERE id = $5
       RETURNING *`,
      [title.trim(), description ?? "", priority, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});