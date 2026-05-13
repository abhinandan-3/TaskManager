import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  LogOut,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  const [loggedIn, setLoggedIn] =
    useState(
      localStorage.getItem("token")
    );

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Member");

  useEffect(() => {

    if (loggedIn) {
      fetchTasks();
    }

  }, [loggedIn]);

  const fetchTasks = async () => {

    const res = await fetch(
      "http://localhost:5000/api/tasks"
    );

    const data = await res.json();

    setTasks(data);
  };

  const handleAuth = async () => {

    const endpoint = isLogin
      ? "login"
      : "register";

    const bodyData = isLogin
      ? {
          email,
          password,
        }
      : {
          name,
          email,
          password,
          role,
        };

    try {

      const res = await fetch(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            bodyData
          ),
        }
      );

      const data =
        await res.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "role",
          data.role || role
        );

        setLoggedIn(true);

      } else {

        alert(
          data.message ||
            "Authentication Failed"
        );
      }

    } catch (error) {

      alert(
        "Server Error"
      );
    }
  };

  const addTask = async () => {

    if (!title) return;

    await fetch(
      "http://localhost:5000/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          assigned_to: 1,
          project_id: 1,
          due_date: "2026-05-20",
        }),
      }
    );

    setTitle("");

    fetchTasks();
  };

  const updateTask = async (id) => {

    await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      }
    );

    fetchTasks();
  };

  const deleteTask = async (id) => {

    await fetch(
      `http://localhost:5000/api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchTasks();
  };

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "Completed"
    ).length;

  const overdueTasks =
    tasks.filter(
      (task) =>
        new Date(task.due_date) <
          new Date() &&
        task.status !==
          "Completed"
    ).length;

  const chartData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
  ];

  if (!loggedIn) {

    return (

      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">

        <div className="bg-slate-800 p-10 rounded-2xl w-[420px] shadow-2xl">

          <h1 className="text-4xl font-bold mb-8 text-center">
            {isLogin
              ? "Login"
              : "Register"}
          </h1>

          {!isLogin && (

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full bg-slate-700 p-4 rounded-xl mb-4 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-slate-700 p-4 rounded-xl mb-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-slate-700 p-4 rounded-xl mb-4 outline-none"
          />

          {!isLogin && (

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="w-full bg-slate-700 p-4 rounded-xl mb-6 outline-none"
            >

              <option>
                Admin
              </option>

              <option>
                Member
              </option>

            </select>
          )}

          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-lg font-semibold"
          >
            {isLogin
              ? "Login"
              : "Register"}
          </button>

          <p className="text-center mt-6 text-slate-400">

            {isLogin
              ? "Don't have account?"
              : "Already have account?"}

            <span
              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }
              className="text-blue-400 cursor-pointer ml-2"
            >
              {isLogin
                ? "Register"
                : "Login"}
            </span>

          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-slate-900 text-white">

      <div className="w-64 bg-slate-800 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            TaskFlow
          </h1>

          <div className="space-y-6">

            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <LayoutDashboard />
              <p>Dashboard</p>
            </div>

            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FolderKanban />
              <p>Projects</p>
            </div>

            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <CheckSquare />
              <p>Tasks</p>
            </div>

            <div className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <Users />
              <p>Team</p>
            </div>

          </div>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "role"
            );

            setLoggedIn(false);

          }}
          className="flex items-center gap-3 hover:text-red-400"
        >
          <LogOut />
          <p>Logout</p>
        </button>

      </div>

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your team and tasks efficiently
            </p>

          </div>

          <div className="bg-blue-600 px-5 py-2 rounded-xl">
            Role: {localStorage.getItem("role")}
          </div>

        </div>

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2>Total Tasks</h2>

            <p className="text-4xl font-bold mt-3">
              {tasks.length}
            </p>

          </div>

          <div className="bg-green-600 p-6 rounded-2xl">

            <h2>Completed</h2>

            <p className="text-4xl font-bold mt-3">
              {completedTasks}
            </p>

          </div>

          <div className="bg-yellow-500 p-6 rounded-2xl">

            <h2>Pending</h2>

            <p className="text-4xl font-bold mt-3">
              {pendingTasks}
            </p>

          </div>

          <div className="bg-red-600 p-6 rounded-2xl">

            <h2>Overdue</h2>

            <p className="text-4xl font-bold mt-3">
              {overdueTasks}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Add Task
            </h2>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Enter task"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="bg-slate-700 p-3 rounded-xl flex-1 outline-none"
              />

              <button
                onClick={addTask}
                className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700"
              >
                Add
              </button>

            </div>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Task Analytics
            </h2>

            <div className="h-56">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={80}
                  >

                    {chartData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Task List
          </h2>

          <div className="space-y-4">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="bg-slate-700 p-5 rounded-xl flex justify-between items-center"
              >

                <div>

                  <h2 className="text-xl font-semibold">
                    {task.title}
                  </h2>

                  <p className="text-sm text-slate-300">
                    Status:
                    {" "}
                    {task.status}
                  </p>

                  <p className="text-sm text-slate-300">
                    Due:
                    {" "}
                    {task.due_date}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      updateTask(
                        task.id
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;