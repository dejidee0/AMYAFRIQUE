import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";

import animationTwo from "../assets/Animation - 1714318615069.json";
import supabase from "../../supabase-client";
const Logged = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Email & Password Login
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors(error.message);
      Swal.fire({
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      setSuccess("Logged in successfully");
      Swal.fire({
        text: "Successfully logged in",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate(location?.state || "/");
    }
    setLoading(false);
  };

  return (
    <Slide>
      <div className="flex flex-col items-center justify-center min-h-[50vh] ">
        <Lottie animationData={animationTwo} className="w-72 h-72" />
        <form
          onSubmit={handleLogIn}
          className="w-96 p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center">
            Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 mb-3 border text-black border-orange-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 mb-3 text-black border-orange-500 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {errors && <p className="text-red-500 mt-2 text-center">{errors}</p>}
          {success && (
            <p className="text-green-500 mt-2 text-center">{success}</p>
          )}

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Slide>
  );
};

export default Logged;
