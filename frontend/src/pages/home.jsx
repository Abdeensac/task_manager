import { useNavigate } from "react-router-dom";

import Stats from "../components/stats";
import TaskList from "../components/tasklist";

function Home({ tasks, onDeleteTask,onUpdateTask,isLoading}) {

  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            My Tasks
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your tasks and keep track of your progress.
          </p>

        </div>


        {/* Add Task Button */}

        <button
          onClick={() => navigate("/tasks/new")}
          className="rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700 cursor-pointer"
        >
          + Add Task
        </button>

      </div>


      {/* Statistics */}

      <div className="mt-8">
        <Stats tasks={tasks} />
      </div>


      {/* Task List */}

{/* Task List */}

{isLoading ? (
  <p className="py-8 text-center text-gray-500">
    Loading tasks...
  </p>
) : tasks.length === 0 ? (
  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
    <h3 className="text-lg font-semibold text-gray-800">
      No tasks yet
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Add your first task to get started.
    </p>
  </div>
) : (
  <TaskList
    tasks={tasks}
    onDeleteTask={onDeleteTask}
    onUpdateTask={onUpdateTask}
  />
)}
    </main>
  );
}

export default Home;