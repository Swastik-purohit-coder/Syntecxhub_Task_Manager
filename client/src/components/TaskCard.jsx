import API from "../api/axios";

const TaskCard = ({ task, fetchTasks }) => {
  const priorityTone = {
    low: "border-sky-200 bg-sky-100 text-sky-800",
    medium: "border-amber-200 bg-amber-100 text-amber-800",
    high: "border-rose-200 bg-rose-100 text-rose-800",
  };

  const statusTone =
    task.status === "completed"
      ? "border-emerald-200 bg-emerald-100 text-emerald-800"
      : "border-slate-200 bg-slate-100 text-slate-700";

  const cardTone =
    task.status === "completed"
      ? "border-emerald-200 bg-emerald-50/50"
      : "border-slate-200 bg-white";

  const toggleStatus = async () => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });

    fetchTasks();
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this task?");
    if (!shouldDelete) return;

    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  const isOverdue =
    task.deadline && task.status !== "completed" && new Date(task.deadline) < new Date();

  return (
    <div
      className={`mb-3 rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${cardTone}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-800">{task.title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusTone}`}
          >
            {task.status}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
              priorityTone[task.priority] || "border-slate-200 bg-slate-100 text-slate-700"
            }`}
          >
            {task.priority || "none"}
          </span>
        </div>
      </div>

      {task.description ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{task.description}</p>
      ) : null}

      {task.deadline && (
        <p
          className={`mt-3 text-sm font-medium ${
            isOverdue ? "text-red-600" : "text-slate-500"
          }`}
        >
          Deadline: {new Date(task.deadline).toDateString()}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={toggleStatus}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition ${
            task.status === "pending"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-slate-600 hover:bg-slate-700"
          }`}
        >
          {task.status === "pending" ? "Mark Done" : "Undo"}
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;