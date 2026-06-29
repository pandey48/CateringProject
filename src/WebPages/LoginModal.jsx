import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ChefHat,
  LogIn,
} from "lucide-react";

export default function LoginModal({ onSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "7067143622" && password === "020579") {
       navigate("/admin");

      
      onSuccess();
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033')] bg-cover bg-center">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative flex justify-center items-center min-h-screen p-4">

        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 animate-[fadeIn_.5s_ease]">

          {/* Logo */}

          <div className="flex justify-center mb-5">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">

              <ChefHat className="text-white" size={42} />

            </div>

          </div>

          <h2 className="text-4xl font-bold text-center text-white">
            Pandey Catering
          </h2>

          <p className="text-center text-gray-200 mt-2">
            Admin Dashboard Login
          </p>

          {/* Username */}

          <div className="mt-8 relative">

            <User
              className="absolute left-4 top-3 text-gray-300"
              size={20}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

          </div>

          {/* Password */}

          <div className="mt-5 relative">

            <Lock
              className="absolute left-4 top-3 text-gray-300"
              size={20}
            />

            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 text-gray-300"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-5">

            <label className="flex items-center gap-2 text-white">

              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              Remember Me

            </label>

            <button className="text-yellow-300 text-sm">
              Forgot Password?
            </button>

          </div>

          {/* Error */}

          {error && (
            <p className="text-red-400 text-center mt-4">
              {error}
            </p>
          )}

          {/* Login */}

          <button
            onClick={handleLogin}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 duration-300 text-white font-bold flex justify-center items-center gap-3"
          >
            <LogIn size={20} />
            Login
          </button>

          <div className="text-center mt-8 text-gray-300 text-sm">
            © 2026 Pandey Catering
          </div>

        </div>

      </div>

    </div>
  );
}