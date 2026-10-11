import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/tasks" className="text-2xl font-bold text-gray-900">
          TaskFlow
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/tasks" className="text-gray-600 hover:text-red-500">
            Tasks
          </Link>

          <Link
            to="/tasks/new"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
          >
            + Add Task
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;