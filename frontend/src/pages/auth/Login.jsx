import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/students/Loading";
import { Appcontext } from "../../context/AppContext";

const Login = () => {
  const [profile, setProfile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchUser } = useContext(Appcontext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        console.log(res.data);
        console.log(res.data.user.role);
        await fetchUser();
        navigate("/");
      } else {
        setError(res.data?.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-blue-100 flex justify-center items-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/40">
        <h2 className="text-black text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-md bg-white/30 text-black placeholder-white/80 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-md bg-white/30 text-black placeholder-white/80 outline-none"
          />

          <button
            type="submit"
            className="bg-white text-blue-600 cursor-pointer font-bold py-3 rounded-md hover:bg-purple-100 transition"
          >
            {loading ? (
              <div className="flex justify-center items-center h-5">
                <div className="w-5 h-5 scale-50 overflow-hidden">
                  <Loading />
                </div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        <p className="text-black text-sm sm:text-base text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
