import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../assets/Animation - 1714318361741.json";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";
import supabase from "../../supabase-client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
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
    <div className="min-h-screen hero overflow-hidden w-full">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-screen-lg w-full mx-auto px-4">
        {/* Left Section: Animation */}
        <div className="text-center ">
          <h1 className="text-3xl md:text-5xl font-bold">Register now!</h1>
          <Lottie animationData={animation}></Lottie>
        </div>

        {/* Right Section: Form */}
        <Slide>
          <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-8 rounded-lg w-full max-w-md border border-gray-700">
            {message && (
              <p className="text-green-400 text-center mb-2">{message}</p>
            )}
            {registerError && (
              <p className="text-red-400 text-center mb-2">{registerError}</p>
            )}

            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-orange-500 text-black">
                  Register
                </button>
              </div>

              <p>
                Already have an account? Please{" "}
                <Link to={"/logged"}>
                  <span className="text-orange-500">Login</span>
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
