import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/students/Loading";

const Signup = () => {
  const [profile, setProfile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Upload profile Picture");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", imageFile);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        console.log(res.data);
        navigate("/");
      } else {
        setError(res.data?.message || "Signup failed.");
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
        {profile && (
          <div className="flex justify-center mb-4">
            <img
              src={profile}
              alt="Profile Preview"
              className="w-25 h-25 rounded-full object-cover object-center border-4 border-white shadow-md"
            />
          </div>
        )}
        <h2 className="text-black text-2xl sm:text-3xl font-bold mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 rounded-md bg-white/30 text-black placeholder-white/80 outline-none"
          />
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

          <div>
            <label
              htmlFor="profile"
              className="flex flex-col md:flex-row md:items-center gap-4 text-black font-medium cursor-pointer"
            >
              <span className="bg-blue-400 px-4 py-2 rounded-xl font-bold text-white text-center w-fit">
                Upload Photo
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile"
              onChange={handleProfileChange}
              className="hidden"
            />
          </div>

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
              "Create Account"
            )}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        <p className="text-black text-sm sm:text-base text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
