
import { useState } from "react";
import TaskCard from "./taskcard";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Filter tasks by status and search text
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === "All" || task.status === filter;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      (task.title || "").toLowerCase().includes(search) ||
      (task.description || "").toLowerCase().includes(search);
      
      const matchesPriority =
  priorityFilter === "All" ||
  task.priority === priorityFilter;

    return matchesStatus && matchesSearch && matchesPriority;
  });

  return (
    <section className="mt-8">
      {/* Heading and task count */}
      <div className="mb-5">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Your Tasks ({filteredTasks.length})
        </h2>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
        />

        {/* Filter dropdowns for Status and Priority */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Display filtered tasks */}
      {filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-gray-500">
          No tasks found.
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;