import { Link, NavLink } from "react-router-dom";
import logo from ".././assets/logo.png";
// useContext,
import { useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import { Flip } from "react-awesome-reveal";

const Navbar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(true);
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  console.log(theme);

  // const handleLogOut = () => {
  //   logOut();
  // };
  const links = (
    <>
      <NavLink to={"/"} className={"text-[#eb9b40] font-extrabold"}>
        Home
      </NavLink>
      <NavLink to={"/allArt"} className={"text-[#eb9b40] font-extrabold"}>
        All Art{" "}
      </NavLink>
      {user && (
        <NavLink to={"/addCraft"} className={"text-[#eb9b40] font-extrabold"}>
          Add Art Item
        </NavLink>
      )}
      {user && (
        <NavLink to={"/myCraft"} className={"text-[#eb9b40] font-extrabold"}>
          My Art List
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
          <Flip>
            <img
              src={logo}
              className="h-[100px] w-[100px] lg:block hidden md:block"
              alt=""
            />
          </Flip>

          {/* <a className="lg:text-2xl font-extrabold text-[#eb9b40]">
            Amara Okparachi
          </a> */}
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
          <div className="flex flex-col gap-3">
            {!user ? (
              <>
                {" "}
                <div className="dropdown dropdown-end flex flex-row gap-3">
                  <div
                    tabIndex={0}
                    role=""
                    className=" btn btn-circle avatar tooltip tooltip-top lg:tooltip-top"
                    data-tip={!user.displayName}
                  >
                    <div className=" rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={!user.photoURL}
                      />
                    </div>
                  </div>
                  <button
                    // onClick={handleLogOut}
                    className="btn bg-[#eb9b40] text-black"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className=" flex flex-row gap-3">
                <Link to={"/logged"}>
                  <button className="lg:btn md:btn lg:bg-[#eb9b40] md:bg-[#eb9b40] bg-p[#eb9b40] lg:text-black md:text-black text-black p-1">
                    Login
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="lg:btn md:btn lg:bg-[#eb9b40] md:bg-[#eb9b40] bg-purple-600] lg:text-black md:text-black text-black p-1">
                    Register
                  </button>
                </Link>
              </div>
            )}
            <div className="lg:mr-4 block lg:hidden md:hidden">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
