import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function submit(e) {
    e.preventDefault();
    if (user.trim() && pass.trim()) onLogin(user);
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Login SkyFly Pro</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="input-field mt-1"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="input-field mt-1"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary-lg w-full">Login</button>
        </form>
      </div>
    </section>
  );
}