import { useState } from "react";

function TaskForm({ onAddTask }) {

  // Separate state for each form field

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");


  // State for the complete task

  const [completeTask, setCompleteTask] = useState(null);


  function handleSubmit(event) {

    event.preventDefault();


    // Create complete task object

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      status: "Pending",
    };


    // Store complete task in state
    setCompleteTask(newTask);

    // Send complete task to AddTask if callback is provided
    if (typeof onAddTask === "function") {
      onAddTask(newTask);
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setPriority("Medium");
  }


  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* TITLE */}

        <div>

          <label className="block text-sm font-medium text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
          />

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter task description"
            rows="4"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
          />

        </div>


        {/* PRIORITY */}

        <div>

          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

        </div>


        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700"
        >
          Add Task
        </button>

      </form>

    </section>
  )
}

export default TaskForm;