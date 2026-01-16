import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faShareNodes,
  faUsers,
  faCompass,
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Clear token from Auth context
    setToken(null);
    // Show success message
    toast.success("Logged out successfully!");
    // Redirect to login page
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-white shadow px-3 py-4 text-lg">
        <div className="container  mx-auto max-w-7xl flex justify-between items-center ">
          <div className="left-side flex justify-center items-center gap-8">
            <h1 className="text-2xl ">
              <Link to="/" className="space-x-2">
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className="text-blue-500"
                />
                <span className="font-bold text-black">SocialApp</span>
              </Link>
            </h1>
            <ul className="hidden md:flex justify-center items-center gap-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive && `text-blue-500`
                    } space-x-2 hover:text-blue-500 transition-colors duration-300`
                  }
                >
                  <FontAwesomeIcon icon={faHouse} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `${isActive && `text-blue-500`
                    } space-x-2 hover:text-blue-500 transition-colors duration-300`
                  }
                >
                  <FontAwesomeIcon icon={faCompass} />
                  <span>Explore</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/communities"
                  className={({ isActive }) =>
                    `${isActive && `text-blue-500`
                    } space-x-2 hover:text-blue-500 transition-colors duration-300`
                  }
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Communities</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="right-side hidden md:flex gap-5 items-center ">
            <div className="search-input relative hidden xl:block">
              <input
                type="search"
                placeholder="search posts, people, topics, ...."
                className=" border-transparent border-2 focus:outline-none focus focus:border-blue-400 bg-gray-100 py-1 px-4 rounded-full pl-11 min-w-72 transition-colors duration-200"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "
              />
            </div>
            <div className="icons space-x-2">
              <button className="notification-btn cursor-pointer relative space-x-2 mr-4 before:bg-red-500 before:w-2 before:h-2 before:rounded-full before:absolute before:top-0 before:right-0  before:translate-x-1/2 -before:translate-y-1/2">
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="messages-btn cursor-pointer relative space-x-2 before:bg-red-500  before:w-2 before:h-2 before:rounded-full before:absolute before:top-0 before:right-0 before:translate-x-1/2 -before:translate-y-1/2">
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </div>
            <button className="create-post-btn bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 space-x-2 cursor-pointer">
              <FontAwesomeIcon icon={faPlus} />
              <span>Create Post</span>
            </button>
            <button 
              onClick={handleLogout}
              className="logout-btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 space-x-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
          <button className="text-2xl block md:hidden lg:hidden cursor-pointer">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>
    </div>
  );
}
