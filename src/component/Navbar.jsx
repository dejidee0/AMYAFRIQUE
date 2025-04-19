import { Link, NavLink } from "react-router-dom";
import logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import { FaCartPlus, FaUserCircle } from "react-icons/fa";

import supabase from "../../supabase-client";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const [user, setUser] = useState(null); // Set to null initially
  const allowedEmails = [
    "amyafriquee@gmail.com",
    "dnlcodes4@gmail.com",
    "ifemicheal2@gmail.com",
  ];
  useEffect(() => {
    // Check user session on mount
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const links = (
    <>
      <NavLink to={"/"} className={"text-[#eb9b40] font-extrabold"}>
        Home
      </NavLink>
      <NavLink to={"/allArt"} className={"text-[#eb9b40] font-extrabold"}>
        All Art
      </NavLink>
      <NavLink to={"/events"} className={"text-[#eb9b40] font-extrabold"}>
        Events
      </NavLink>

      <NavLink to={"/aboutUs"} className={"text-[#eb9b40] font-extrabold"}>
        About Us
      </NavLink>

      {allowedEmails.includes(user?.email) && (
        <NavLink to={"/myCraft"} className={"text-[#eb9b40] font-extrabold"}>
          My Craft
        </NavLink>
      )}

      {allowedEmails.includes(user?.email) && (
        <NavLink to={"/addCraft"} className={"text-[#eb9b40] font-extrabold"}>
          Add Art Item
        </NavLink>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>{links}</li>
            </ul>
          </div>
          <img
            src={logo}
            className="h-[100px] w-[100px] lg:block hidden md:block"
            alt="Logo"
          />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="flex flex-row gap-3">{links}</li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="lg:mr-4 lg:block hidden md:block">
            <label className="flex cursor-pointer gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                onChange={handleTheme}
                type="checkbox"
                className="toggle theme-controller"
                checked={theme === "dark"}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/myCart">
              <FaCartPlus size={25} />
            </Link>

            <div className="dropdown dropdown-end">
              <Link
                to="/login"
                className="tooltip tooltip-bottom"
                data-tip={user ? user.email : "Sign in / Register"}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle avatar"
                >
                  <FaUserCircle className="text-[#eb9b40]" size={28} />
                </div>
              </Link>
            </div>

            {user && (
              <button
                onClick={handleLogOut}
                className="btn bg-[#eb9b40] text-black"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
