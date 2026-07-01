import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Task Pages
import Dashboard from "./pages/Dashboard";
import CreateUpdateTask from "./components/tasks/CreateUpdateTask";
import AllTasks from "./components/tasks/AllTasks";
import MyTasks from "./components/tasks/MyTasks";

function App() {
  return (
    <BrowserRouter>

      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard Home */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* Dashboard */}

          <Route
            path="home"
            element={<Dashboard />}
          />

          {/* Create Task */}

          <Route
            path="create-task"
            element={<CreateUpdateTask />}
          />

          {/* Edit Task */}

          <Route
            path="edit-task/:ID"
            element={<CreateUpdateTask />}
          />

          {/* All Tasks */}

          <Route
            path="all-tasks"
            element={<AllTasks />}
          />

          {/* My Tasks */}

          <Route
            path="my-tasks"
            element={<MyTasks />}
          />

          {/* Users */}

          <Route
            path="users"
            element={<Users />}
          />

          {/* Profile */}

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

        {/* Invalid Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;