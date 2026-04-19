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

  const formatDeadline = (value) => {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div
      className={`mb-3 rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${cardTone}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="break-words text-base font-bold text-slate-800 sm:text-lg">
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
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
        <div
          className={`mt-3 flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium sm:text-sm ${
            isOverdue
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          <span className="font-semibold uppercase tracking-wide">Deadline</span>
          <time className="break-words">{formatDeadline(task.deadline)}</time>
          {isOverdue ? (
            <span className="rounded-full border border-red-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
              Overdue
            </span>
          ) : null}
        </div>
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