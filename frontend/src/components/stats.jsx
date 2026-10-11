
function Stats({ tasks = [] }) {
  const total = tasks.length;

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const priority = tasks.filter(
    (t) => t.priority === "High"
  ).length;

  return (
    <div className="mt-8">
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">

        {/* Total Tasks */}
        <div className="rounded-xl border border-gray-200 bg-red-300 p-6">
          <p className="text-sm text-gray-700">
            Total Tasks
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {total}
          </h3>
        </div>

        {/* Pending Tasks */}
        <div className="rounded-xl border border-gray-200 bg-red-300 p-6">
          <p className="text-sm text-gray-700">
            Pending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {pending}
          </h3>
        </div>

        {/* Completed Tasks */}
        <div className="rounded-xl border border-gray-200 bg-red-300 p-6">
          <p className="text-sm text-gray-700">
            Completed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {completed}
          </h3>
        </div>

        {/* High Priority Tasks */}
        <div className="rounded-xl border border-gray-200 bg-red-300 p-6">
          <p className="text-sm text-gray-700">
            High Priority
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {priority}
          </h3>
        </div>

      </section>
    </div>
  );
}

export default Stats;