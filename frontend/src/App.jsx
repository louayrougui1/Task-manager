import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./page/LandingPage";
import TasksList from "./page/TasksList";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetAccessToken from "./getAcessToken";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  useGetAccessToken();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
