import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskform";

function AddTask({ onAddTask }) {

  const navigate = useNavigate();

  function handleAddTask(completeTask) {
    if (typeof onAddTask === "function") {
      onAddTask(completeTask);
    }

    navigate("/tasks");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">

      <button
        onClick={() => navigate("/tasks")}
        className="mb-6 text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back to Tasks
      </button>

      <h2 className="text-3xl font-bold text-gray-900">
        Add New Task
      </h2>

      <TaskForm onAddTask={handleAddTask} />

    </main>
  );
}

export default AddTask;