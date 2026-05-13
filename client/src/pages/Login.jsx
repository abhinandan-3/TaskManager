function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl w-96">

        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Login
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login