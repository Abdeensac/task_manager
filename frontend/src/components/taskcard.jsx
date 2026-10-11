import { useState } from "react";

function TaskCard({ task, onDeleteTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">

      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-3 rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-3 ml-2 rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            className="mt-3 ml-2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => {
              onUpdateTask(task.id, {
                title,
                description,
                priority,
                status,
              });

              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
  type="button"
  className="mt-3 ml-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
  onClick={() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setIsEditing(false);
  }}
>
  Cancel
  </button>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {task.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {task.description}
            </p>
          </div>

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            {task.priority}
          </span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-yellow-600 font-medium">
          {task.status}
        </span>

        <div className="flex gap-2">
          <button
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

export default TaskCard;