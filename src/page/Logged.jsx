// import { useContext, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import animationTwo from "../assets/Animation - 1714318615069.json";
// import Lottie from "lottie-react";
// import Swal from "sweetalert2";
// import { Slide } from "react-awesome-reveal";

// const Logged = () => {
//   const {signIn, google, github} =useContext(AuthContext)
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [success, setSuccess] = useState("");
//   const [errors, setErrors] = useState("");

//   const handleLogIn = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     const newLogger = { email, password };
//     console.log(newLogger);
//   };
//   setErrors("");
//   setSuccess("");

//   signIn(email, password)
//   .then(result=>{
//     console.log(result.user)
//     setSuccess('User logged successfully')
//     Swal.fire({

//       text: 'successfully logged in',
//       icon: 'success',
//       confirmButtonText: 'Ok'
//     }, success)
//     form.reset();
//     navigate(location?.state? location.state:'/');
//   })
//   .catch(error=>{
//     console.log(error.message)
//     setErrors(error.message)
//     Swal.fire({

//       text: 'An error occurred',
//       icon: 'error',
//       confirmButtonText: 'Ok'
//     }, errors)
//   })
//   };
//   const handleGoogle=()=>{
//     setErrors('')
//     setSuccess('')
//     google()
//     .then(result=>{
//       console.log(result.user)
//       setSuccess('User logged successfully')

//       Swal.fire({

//         text: 'successfully logged in',
//         icon: 'success',
//         confirmButtonText: 'Ok'
//       }, success)
//       navigate(location?.state? location.state:'/');
//     })
//     .catch(error=>{
//       console.log(error.message)
//       setErrors(error.message)
//       Swal.fire({

//         text: 'An error occurred',
//         icon: 'error',
//         confirmButtonText: 'Ok'
//       }, errors)
//     })
//   }

// const handleGithub=()=>{
//   setErrors('')
//   setSuccess('')
//   github()
//   .then(result=>{
//     console.log(result.user)

//     setSuccess('User logged successfully')
//     Swal.fire({

//       text: 'successfully logged in',
//       icon: 'success',
//       confirmButtonText: 'Ok'
//     }, success)
//     navigate(location?.state?location.state:'/');
//   })
//   .catch(error=>{
//     console.log(error.message)
//     setErrors(error.message)
//     Swal.fire({

//       text: 'An error occurred',
//       icon: 'error',
//       confirmButtonText: 'Ok'
//     }, errors)
//     Swal.fire({

//       text: 'An error occurred',
//       icon: 'error',
//       confirmButtonText: 'Ok'
//     }, )
//   })
// }

//   return (
//     <div className="hero ">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold">Login now!</h1>
//           <Lottie animationData={animationTwo}></Lottie>
//         </div>
//         <Slide>
//           <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//             <form onSubmit={handleLogIn} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="email"
//                   name="email"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="password"
//                   name="password"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control mt-6">
//                 <button className="btn bg- text-black">Login</button>
//               </div>
//               <p>
//                 Do not have an account? Please{" "}
//                 {/* <Link to={"/register"}>
//                   <span className="text-blue-800">Register</span>
//                 </Link> */}
//               </p>
//             </form>
//             <div className="flex flex-row justify-center p-10 gap-4">
//               <button
//                 // onClick={handleGoogle}
//                 className="btn bg-[#eb9b40] text-black"
//               >
//                 <FaGoogle />
//                 Google
//               </button>
//               <button
//                 // onClick={handleGithub}
//                 className="btn bg-[#eb9b40] text-black"
//               >
//                 <FaGithub />
//                 Github
//               </button>
//             </div>
//           </div>
//         </Slide>
//       </div>
//     </div>
//   );
// };

// export default Logged;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import animationTwo from "../assets/Animation - 1714318615069.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";

const Logged = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("Login Attempt:", { email, password });

    // Simulating login success (Replace with real authentication logic if needed)
    if (email === "test@example.com" && password === "password123") {
      setSuccess("User logged in successfully");
      Swal.fire({
        text: "Successfully logged in",
        icon: "success",
        confirmButtonText: "Ok",
      });
      form.reset();
      navigate(location?.state ? location.state : "/");
    } else {
      setErrors("Invalid credentials");
      Swal.fire({
        text: "An error occurred",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Slide>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Lottie animationData={animationTwo} className="w-64 h-64" />
        <form
          onSubmit={handleLogIn}
          className="w-96 p-6 bg-white shadow-md rounded-md"
        >
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 mb-3 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 mb-3 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Login
          </button>
          {errors && <p className="text-red-500 mt-2">{errors}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <p className="mt-4 text-center">
            Don&pos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Slide>
  );
};

export default Logged;
