import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 import this at the top

import Lottie from "lottie-react";
import animation from "../assets/Animation - 1714318361741.json";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";
import supabase from "../../supabase-client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setRegisterError("");

    // Basic password validation
    if (password.length < 6) {
      setRegisterError("Password should have at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password should have at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setRegisterError("Password should have at least one lowercase letter.");
      return;
    }
    if (password !== verifyPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    // Register user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setRegisterError(error.message);
      return;
    }

    if (data) {
      setMessage("User account created successfully!");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration successful. Redirecting to Home...",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    setName("");
    setEmail("");

    setPassword("");
  };

  return (
    <div className="min-h-screen hero overflow-hidden w-full px-4 sm:px-6 lg:px-8">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-7xl mx-auto gap-8 lg:gap-16">
        {/* Left Section: Animation */}
        <div className="text-center w-full lg:w-1/2 xl:w-2/5">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold leading-tight mb-4 sm:mb-8">
            Register now!
          </h1>
          <div className="max-w-md lg:max-w-none mx-auto aspect-square">
            <Lottie animationData={animation} className="w-full h-full" />
          </div>
        </div>

        {/* Right Section: Form */}
        <Slide>
          <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-lg w-full max-w-md lg:max-w-lg xl:max-w-xl border border-gray-700">
            {message && (
              <p className="text-green-400 text-center mb-3 sm:mb-4 text-sm sm:text-base">
                {message}
              </p>
            )}
            {registerError && (
              <p className="text-red-400 text-center mb-3 sm:mb-4 text-sm sm:text-base">
                {registerError}
              </p>
            )}
            <form
              onSubmit={handleRegister}
              className="card-body space-y-4 sm:space-y-6"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base sm:text-lg">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-md sm:input-lg"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base sm:text-lg">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-md sm:input-lg"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text text-base sm:text-lg">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="input input-bordered input-md sm:input-lg w-full pr-12"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-xs sm:btn-sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {password.length > 0 && (
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-base sm:text-lg">
                      Verify Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showVerifyPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="input input-bordered input-md sm:input-lg w-full pr-12"
                      required
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-xs sm:btn-sm"
                      onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                    >
                      {showVerifyPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              )}

              <div className="form-control mt-8">
                <button className="btn bg-orange-500 hover:bg-orange-600 text-black text-lg w-full">
                  Register
                </button>
              </div>

              <p className="text-center text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Register;
