import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";

import animationTwo from "../assets/Animation - 1714318615069.json";
import supabase from "../../supabase-client";
const Login = () => {
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

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      Swal.fire({
        title: "Missing Details",
        text: "Please fill in both email and password.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let friendlyMessage = "Something went wrong. Please try again.";

        if (error.message.toLowerCase().includes("invalid login")) {
          friendlyMessage = "Incorrect email or password.";
        } else if (error.message.toLowerCase().includes("user not found")) {
          friendlyMessage = "Account not found. Please check your email.";
        } else if (
          error.message.toLowerCase().includes("email not confirmed")
        ) {
          friendlyMessage =
            "Your email hasn't been confirmed yet. Please check your inbox.";

          Swal.fire({
            title: "Email Not Confirmed",
            text: "Please verify your email before logging in to complete the registration process.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Resend Confirmation",
            cancelButtonText: "Cancel",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { error: resendError } = await supabase.auth.resend({
                type: "signup",
                email: email,
              });

              if (resendError) {
                Swal.fire({
                  icon: "error",
                  title: "Resend Failed",
                  text: "We couldn't resend the email. Please try again later.",
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Confirmation Sent",
                  text: "A new confirmation email has been sent to your inbox.",
                });
              }
            }
          });
        } else if (error.message.toLowerCase().includes("network")) {
          friendlyMessage =
            "Network error. Please check your internet connection.";
        }

        setErrors(friendlyMessage);

        Swal.fire({
          title: "Login Failed",
          text: friendlyMessage,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        setSuccess("Logged in successfully");

        Swal.fire({
          title: "Welcome!",
          text: "You've successfully logged in.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate(location?.state || "/");
      }
    } catch (err) {
      Swal.fire({
        title: "Unexpected Error",
        text: "We encountered an unexpected error. Please try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
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

          {errors && (
            <p
              className="text-red-500 mt-2 text-center"
              role="alert"
              aria-live="polite"
            >
              {errors}
            </p>
          )}
          {success && (
            <p
              className="text-green-500 mt-2 text-center"
              role="alert"
              aria-live="polite"
            >
              {success}
            </p>
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

export default Login;
