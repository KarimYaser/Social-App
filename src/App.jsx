import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import PostDetails from "./Pages/PostDetails/PostDetails";
import NotFound from "./Pages/NotFound/NotFound";
import AuthProvider from "./Context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Settings from "./Pages/Settings/Settings";
import AuthRoute from "./Components/AuthRoute/AuthRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
    },
    {
      path: "/login",
      element:
        <AuthRoute>
          <Login />
        </AuthRoute>
    },
    {
      path: "/signup",
      element:
        <AuthRoute>
          <Signup />
        </AuthRoute>
    },
    {
      path: "/profile",
      element: <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    },
    {
      path: "/postDetails/:id",
      element: <ProtectedRoute>
        <PostDetails />
      </ProtectedRoute>
    },
    {
      path: "/settings",
      element: <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </AuthProvider>
    </>
  );
}

export default App;
