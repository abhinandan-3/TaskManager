function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      <div className="w-64 bg-zinc-900 p-6 border-r border-zinc-800">
        <h1 className="text-3xl font-bold text-blue-500 mb-12">
          Task Team
        </h1>

        <ul className="space-y-5 text-lg">
          <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-400 cursor-pointer">Projects</li>
          <li className="hover:text-blue-400 cursor-pointer">Tasks</li>
          <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
          <li className="hover:text-blue-400 cursor-pointer">Team</li>
          <li className="hover:text-blue-400 cursor-pointer">Settings</li>
        </ul>
      </div>

      <div className="flex-1">

        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-zinc-800 px-4 py-2 rounded-lg outline-none"
            />

            <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
              + Create Task
            </button>
          </div>
        </div>

        <div className="p-8">

          <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="text-zinc-400">Total Projects</h3>
              <p className="text-4xl font-bold mt-4">12</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="text-zinc-400">Tasks</h3>
              <p className="text-4xl font-bold mt-4">48</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="text-zinc-400">Completed</h3>
              <p className="text-4xl font-bold mt-4 text-green-400">30</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="text-zinc-400">Pending</h3>
              <p className="text-4xl font-bold mt-4 text-yellow-400">18</p>
            </div>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-6">Recent Tasks</h3>

            <div className="space-y-4">

              <div className="flex justify-between bg-zinc-800 p-4 rounded-xl">
                <div>
                  <h4 className="font-semibold">Design Landing Page</h4>
                  <p className="text-zinc-400 text-sm">UI/UX Project</p>
                </div>

                <span className="bg-yellow-500 text-black px-4 py-1 rounded-lg h-fit">
                  In Progress
                </span>
              </div>

              <div className="flex justify-between bg-zinc-800 p-4 rounded-xl">
                <div>
                  <h4 className="font-semibold">Build Authentication</h4>
                  <p className="text-zinc-400 text-sm">Backend API</p>
                </div>

                <span className="bg-green-500 text-black px-4 py-1 rounded-lg h-fit">
                  Completed
                </span>
              </div>

              <div className="flex justify-between bg-zinc-800 p-4 rounded-xl">
                <div>
                  <h4 className="font-semibold">Database Setup</h4>
                  <p className="text-zinc-400 text-sm">MongoDB Atlas</p>
                </div>

                <span className="bg-red-500 text-black px-4 py-1 rounded-lg h-fit">
                  Pending
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard