import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure want to logout?");
    if (!shouldLogout) return;

    logout();
    navigate("/", { replace: true });
  };

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Daily Focus Board
              </p>
              <h1 className="mt-2 text-3xl font-black text-slate-800 sm:text-4xl">
                Task Manager
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Plan, prioritize, and track every task in one place.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
        </section>

        <TaskForm fetchTasks={fetchTasks} />

        <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Total Tasks
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-900">{total}</p>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Done
            </p>
            <p className="mt-2 text-2xl font-bold text-green-900">{completed}</p>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
              Pending
            </p>
            <p className="mt-2 text-2xl font-bold text-red-900">{pending}</p>
          </div>
        </section>

        <section className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-slate-600">Filter by status</p>
          <select
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </section>

        <section className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
              No tasks found for this filter.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;