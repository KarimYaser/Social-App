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
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { PostUploadContext } from "../../Context/PostUpload.context";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { textareaRef } = useContext(PostUploadContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleMenuLogout = () => {
    handleLogout();
    setIsMenuOpen(false);
  };
  
  const handleCreatePostClick = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
      setIsMenuOpen(false);
    }
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
            <button 
              onClick={handleCreatePostClick}
              className="create-post-btn bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 space-x-2 cursor-pointer"
            >
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
          <button 
            onClick={toggleMenu}
            className="text-2xl block md:hidden lg:hidden cursor-pointer relative"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-20 left-0 right-0 bg-white shadow-lg md:hidden z-50">
              <div className="container mx-auto px-3 py-4">
                <ul className="flex flex-col gap-4">
                  <li>
                    <button
                      onClick={() => handleNavigation("/")}
                      className="w-full text-left space-x-2 hover:text-blue-500 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faHouse} />
                      <span>Home</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/explore")}
                      className="w-full text-left space-x-2 hover:text-blue-500 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faCompass} />
                      <span>Explore</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/communities")}
                      className="w-full text-left space-x-2 hover:text-blue-500 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faUsers} />
                      <span>Communities</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full text-left space-x-2 hover:text-blue-500 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Profile</span>
                    </button>
                  </li>
                  <hr className="my-2" />
                  <li>
                    <button 
                      onClick={handleCreatePostClick}
                      className="w-full text-left bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 space-x-2"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Create Post</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleMenuLogout}
                      className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 space-x-2"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
