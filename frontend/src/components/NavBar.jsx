import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/guide", label: "Guide" },

    { to: "/scan", label: "Scan Passport" },
    { to: "/passports", label: "My Scans" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-[#ffffff] dark:bg-[#211236] border-b  dark:border-[#ffffff] fixed w-full z-20">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold font-mono underline decoration-[#6dfd30] text-[#bd7dff] "
        >
          PassWiz
        </motion.div>

        {/* Links for desktop */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex space-x-6"
        >
          {navItems.map(({ to, label }) => {
            const isActive = location.pathname === to;

            return (
              <li key={to} className="py-3">
                <Link
                  to={to}
                  className={`relative pb-1 ${
                    isActive
                      ? "text-[#bd7dff] dark:text-[#bd7dff]"
                      : "text-zinc-400 dark:text-gray-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          <li className="py-2">
            <label className="switch ">
              <input type="checkbox" />
              <span className="slider" onClick={toggleTheme} />
            </label>
          </li>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-black"
            >
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              {user ? (
                <li>
                  <a onClick={logoutHandler}>Logout</a>
                </li>
              ) : (
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              )}
            </ul>
          </div>
        </motion.ul>

        {/* Theme Toggle Button */}

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-200"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden bg-[#ffffff] dark:bg-[#211236] overflow-hidden"
      >
        <ul className="flex flex-col items-center py-4 space-y-4 text-gray-800 dark:text-gray-200">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-[#bd7dff] dark:hover:text-[#bd7dff]"
                onClick={toggleMenu}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <li className="cursor-pointer hover:text-[#bd7dff] dark:hover:text-[#bd7dff]">
              <a onClick={() => { logoutHandler(); toggleMenu(); }}>Logout</a>
            </li>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </li>

          <li>
            <label className="switch md:hidden ">
              <input type="checkbox" />
              <span className="slider" onClick={()=> {toggleTheme();toggleMenu()}} />
            </label>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
